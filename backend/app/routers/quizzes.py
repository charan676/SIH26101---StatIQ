import io
import json
import os
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, ConfigDict, Field
from pypdf import PdfReader
from sqlalchemy import and_, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Competency, Quiz, User, UserCompetency, UserScore
from ..schemas import GeneratedMcq, GeneratedQuizResponse, QuizSubmissionRequest, QuizSubmissionResponse


router = APIRouter(prefix="/api/quizzes", tags=["quizzes"])
dashboard_router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])
MAX_UPLOAD_BYTES = 10 * 1024 * 1024
MAX_EXTRACTED_CHARS = 40_000
BACKEND_ENV_FILE = Path(__file__).resolve().parents[2] / ".env"
DEFAULT_MOCK_USER_ID = 1
DEFAULT_MOCK_USER_EMAIL = "testuser@statiq.ai"

# Local development uses backend/.env, while an explicitly configured process
# environment keeps precedence in deployment.
load_dotenv(BACKEND_ENV_FILE, override=False)

# A teaching taxonomy: questions are mapped only to domains evidenced by a PDF.
MOSPI_OSS_FRAMEWORK = """
MoSPI Official Statistical System (OSS) competency framework:
- Statistical system, governance and metadata: roles of MoSPI/NSO, standards,
  classifications, metadata, quality assurance, confidentiality and release practice.
- Survey design and sampling: frames, probability and non-probability sampling,
  sample design, estimation, weighting, non-response and field operations.
- Economic statistics and national accounts: production, income and expenditure
  approaches, GDP/GVA, supply-use tables, sector accounts, base years and deflation.
- Social, labour, price, agricultural and industrial statistics: concepts,
  indicators, collection methods, index numbers and sector-specific sources.
- SDG indicators and dissemination: indicator definitions, disaggregation,
  data sources, monitoring, comparability and communication.
- Data management and modern methods: validation, data integration, GIS,
  reproducibility, data science, AI/ML and responsible use.
""".strip()

class GeminiMcq(GeneratedMcq):
    """Strict SDK schema with the same fields returned by the quiz API."""

    model_config = ConfigDict(extra="forbid")


class QuizGenerationResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    # Gemini returns this wrapper; the database stores its items in Quiz.questions.
    quizzes: list[GeminiMcq] = Field(min_length=1)


def remove_additional_properties(schema: object) -> object:
    """Remove unsupported JSON Schema keywords from Gemini's response schema."""
    if isinstance(schema, dict):
        schema.pop("additionalProperties", None)
        for value in schema.values():
            remove_additional_properties(value)
    elif isinstance(schema, list):
        for value in schema:
            remove_additional_properties(value)
    return schema


GEMINI_QUIZ_RESPONSE_SCHEMA = remove_additional_properties(
    QuizGenerationResponse.model_json_schema()
)


async def extract_uploaded_text(file: UploadFile) -> str:
    raw = await file.read()
    if not raw:
        raise HTTPException(status_code=422, detail="Uploaded file is empty")
    if len(raw) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="File exceeds the 10 MB upload limit")

    filename = (file.filename or "").lower()
    content_type = file.content_type or ""
    is_pdf = filename.endswith(".pdf") or content_type == "application/pdf"
    is_text = filename.endswith(".txt") or content_type.startswith("text/")
    if is_pdf:
        try:
            reader = PdfReader(io.BytesIO(raw))
            text = "\n".join(page.extract_text() or "" for page in reader.pages)
        except Exception as error:
            raise HTTPException(status_code=422, detail="Unable to extract text from the PDF") from error
        if not text.strip():
            raise HTTPException(status_code=422, detail="PDF has no extractable text; OCR is required for scanned documents")
    elif is_text:
        text = raw.decode("utf-8-sig", errors="replace")
    else:
        raise HTTPException(status_code=415, detail="Only PDF and UTF-8 text files are supported")

    # pypdf returns Unicode strings; this produces a stable UTF-8-safe form.
    normalized = unicodedata.normalize("NFC", text.encode("utf-8", errors="replace").decode("utf-8"))
    normalized = normalized.replace("\x00", "").strip()
    if not normalized:
        raise HTTPException(status_code=422, detail="Uploaded document has no readable text")
    return normalized[:MAX_EXTRACTED_CHARS]


def generate_mcqs(source_text: str, competency_name: str | None, question_count: int) -> list[GeneratedMcq]:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise HTTPException(status_code=503, detail="Quiz generation is unavailable: GEMINI_API_KEY is not configured")

    domain_context = competency_name or "No preselected competency; infer supported framework domains"
    prompt = f"""You are an assessment designer for India's Ministry of Statistics and Programme
Implementation (MoSPI) Official Statistical System. Create exactly {question_count} independent,
source-grounded multiple-choice questions from the learning material.

{MOSPI_OSS_FRAMEWORK}

Map each question to one or more framework areas actually supported by the
supplied material. The selected competency context is: {domain_context}.
Use only facts, definitions, methods, and relationships explicitly present in
the material; do not invent MoSPI policies, numerical facts, citations, or
formulae. Produce exactly {question_count} independent MCQs. Each must have
four plausible, distinct options. `correct_answer` is the zero-based index of
the correct option. In every explanation, briefly identify the source-grounded
reason the option is correct.

Learning material follows:

{source_text}"""
    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model=os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip() or "gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=GEMINI_QUIZ_RESPONSE_SCHEMA,
                temperature=0.2,
            ),
        )
        if not response.text:
            raise ValueError("Gemini returned an empty response")
        payload = json.loads(response.text)
        if not isinstance(payload, dict):
            raise ValueError("Gemini response must be a JSON object")

        quizzes = payload.get("quizzes")
        if not isinstance(quizzes, list):
            raise ValueError("Gemini response must contain a quizzes array")

        # Validate the complete JSON payload after extracting its list. The API
        # and SQLite schema call the persisted list `questions`, so translate
        # only the container name; every MCQ object keeps the existing shape.
        output = QuizGenerationResponse.model_validate(payload)
        questions = list(output.quizzes)
    except Exception as error:
        raise HTTPException(status_code=502, detail=f"The LLM did not return a valid MCQ set: {str(error)}") from error
    if len(questions) != question_count:
        raise HTTPException(status_code=502, detail="The LLM returned an unexpected number of MCQs")
    return questions


def get_or_create_default_mock_user(db: Session) -> User:
    """Provision the Swagger test user when quiz generation has no valid owner.

    The users table deliberately has no password column, so no password value is
    stored for this development-only account.
    """
    user = db.get(User, DEFAULT_MOCK_USER_ID)
    if user is not None:
        return user

    user = db.scalar(select(User).where(User.email == DEFAULT_MOCK_USER_EMAIL))
    if user is not None:
        return user

    user = User(
        id=DEFAULT_MOCK_USER_ID,
        email=DEFAULT_MOCK_USER_EMAIL,
        display_name="Test User",
        is_active=True,
    )
    db.add(user)
    db.flush()
    return user


@dashboard_router.get("/{user_id}")
def get_dashboard(user_id: int, db: Session = Depends(get_db)) -> dict:
    if db.get(User, user_id) is None:
        raise HTTPException(status_code=404, detail="User not found")

    scores = db.execute(
        select(UserScore, Quiz.title)
        .join(Quiz, Quiz.id == UserScore.quiz_id)
        .where(UserScore.user_id == user_id)
        .order_by(UserScore.completed_at.desc())
        .limit(10)
    ).all()
    levels = db.execute(
        select(Competency, UserCompetency)
        .outerjoin(
            UserCompetency,
            and_(
                UserCompetency.competency_id == Competency.id,
                UserCompetency.user_id == user_id,
            ),
        )
        .where(Competency.is_active.is_(True))
        .order_by(Competency.code)
    ).all()

    competencies = [
        {
            "code": competency.code,
            "name": competency.name,
            "current_level": level.current_level if level else 0,
            "required_level": level.required_level if level else 0,
            "remaining_gap": max(0, (level.required_level - level.current_level)) if level else 0,
        }
        for competency, level in levels
    ]
    latest_results = [
        {
            "quiz_id": score.quiz_id,
            "quiz_title": title,
            "score_percent": score.score_percent,
            "correct_answers": score.correct_answers,
            "total_questions": score.total_questions,
            "completed_at": score.completed_at,
        }
        for score, title in scores
    ]
    return {
        "user_id": user_id,
        "latest_results": latest_results,
        "competencies": competencies,
        "charts": {
            "radar": {
                "labels": [item["code"] for item in competencies],
                "current_levels": [item["current_level"] for item in competencies],
                "required_levels": [item["required_level"] for item in competencies],
                "remaining_gaps": [item["remaining_gap"] for item in competencies],
            },
            "score_history": [
                {"label": item["quiz_title"], "score": item["score_percent"], "at": item["completed_at"]}
                for item in reversed(latest_results)
            ],
        },
    }


@router.post("/generate", response_model=GeneratedQuizResponse, status_code=status.HTTP_201_CREATED)
async def generate_quiz(
    file: UploadFile = File(...),
    competency_code: str | None = Form(default=None),
    title: str | None = Form(default=None),
    question_count: int = Form(default=5, ge=1, le=15),
    created_by_user_id: int | None = Form(default=None),
    db: Session = Depends(get_db),
):
    competency = None
    if competency_code:
        competency = db.scalar(select(Competency).where(Competency.code == competency_code))
        if competency is None:
            raise HTTPException(status_code=422, detail="Unknown competency_code")
    if created_by_user_id is not None and db.get(User, created_by_user_id) is None:
        created_by_user_id = get_or_create_default_mock_user(db).id

    questions = generate_mcqs(await extract_uploaded_text(file), competency.name if competency else None, question_count)
    quiz = Quiz(
        title=title or f"Generated quiz: {file.filename or 'learning material'}",
        competency_id=competency.id if competency else None,
        source_material_name=file.filename,
        questions=[question.model_dump() for question in questions],
        created_by_user_id=created_by_user_id,
    )
    db.add(quiz)
    db.commit()
    db.refresh(quiz)
    return GeneratedQuizResponse(quiz_id=quiz.id, title=quiz.title, competency_code=competency_code, questions=questions)


@router.post("/submit", response_model=QuizSubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_quiz(payload: QuizSubmissionRequest, db: Session = Depends(get_db)):
    user = db.get(User, payload.user_id)
    quiz = db.get(Quiz, payload.quiz_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    if not quiz.questions:
        raise HTTPException(status_code=422, detail="Quiz has no questions")
    if len(payload.answers) != len(quiz.questions):
        raise HTTPException(
            status_code=422,
            detail="answers must contain one selected option index for every quiz question",
        )

    correct_answers = 0
    normalized_answers: dict[str, int] = {}
    for index, (question, answer) in enumerate(zip(quiz.questions, payload.answers, strict=True)):
        if answer not in range(len(question["options"])):
            raise HTTPException(status_code=422, detail=f"Invalid option index for question {index}")
        normalized_answers[str(index)] = answer
        if answer == question["correct_answer"]:
            correct_answers += 1

    total_questions = len(quiz.questions)
    score_percent = round(correct_answers / total_questions * 100, 2)
    score = UserScore(
        user_id=user.id,
        quiz_id=quiz.id,
        score_percent=score_percent,
        correct_answers=correct_answers,
        total_questions=total_questions,
        answers=normalized_answers,
    )
    db.add(score)

    competency_code = None
    previous_level = current_level = required_level = remaining_gap = None
    if quiz.competency_id is not None:
        competency = db.get(Competency, quiz.competency_id)
        competency_code = competency.code if competency else None
        level = db.scalar(select(UserCompetency).where(
            UserCompetency.user_id == user.id,
            UserCompetency.competency_id == quiz.competency_id,
        ))
        if level is None:
            level = UserCompetency(user_id=user.id, competency_id=quiz.competency_id, current_level=0, required_level=80)
            db.add(level)
            previous_level = 0
        else:
            previous_level = level.current_level

        # A verified assessment improves the measured level by 0–10 points, not the target.
        improvement = round(score_percent / 10)
        level.current_level = min(100, level.current_level + improvement)
        level.last_assessed_at = datetime.now(timezone.utc)
        current_level = level.current_level
        required_level = level.required_level
        remaining_gap = max(0, required_level - current_level)

    db.commit()
    db.refresh(score)
    return QuizSubmissionResponse(
        score_id=score.id,
        score_percent=score.score_percent,
        correct_answers=score.correct_answers,
        total_questions=score.total_questions,
        competency_code=competency_code,
        previous_level=previous_level,
        current_level=current_level,
        required_level=required_level,
        remaining_gap=remaining_gap,
        completed_at=score.completed_at,
    )
