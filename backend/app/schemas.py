from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class UserPayload(BaseModel):
    email: str
    display_name: str = Field(min_length=1, max_length=150)


class ProfilePayload(BaseModel):
    designation: str = Field(min_length=1, max_length=150)
    department: str | None = Field(default=None, max_length=150)
    current_assignment: str | None = Field(default=None, max_length=255)
    education: str | None = None
    years_of_experience: int | None = Field(default=None, ge=0, le=80)
    previous_trainings: list[str] = Field(default_factory=list)
    target_role: str | None = Field(default=None, max_length=150)
    preferred_language: str = Field(default="en", min_length=2, max_length=10)


class ProfileUpsertRequest(BaseModel):
    user: UserPayload
    profile: ProfilePayload


class ProfileResponse(ProfilePayload):
    model_config = ConfigDict(from_attributes=True)

    user_id: int
    email: str
    display_name: str


class GeneratedMcq(BaseModel):
    question: str = Field(min_length=10)
    options: list[str] = Field(min_length=4, max_length=4)
    correct_answer: int = Field(ge=0, le=3)
    explanation: str = Field(min_length=10)

    @field_validator("options")
    @classmethod
    def require_distinct_options(cls, options: list[str]) -> list[str]:
        cleaned = [option.strip() for option in options]
        if any(not option for option in cleaned) or len(set(cleaned)) != 4:
            raise ValueError("options must contain four distinct, non-empty answers")
        return cleaned


class GeneratedQuizResponse(BaseModel):
    quiz_id: int
    title: str
    competency_code: str | None
    questions: list[GeneratedMcq]


class QuizSubmissionRequest(BaseModel):
    user_id: int = Field(gt=0)
    quiz_id: int = Field(gt=0)
    # Answers are ordered by the corresponding question's position in the quiz.
    answers: list[int] = Field(min_length=1)


class QuizSubmissionResponse(BaseModel):
    score_id: int
    score_percent: float
    correct_answers: int
    total_questions: int
    competency_code: str | None
    previous_level: int | None
    current_level: int | None
    required_level: int | None
    remaining_gap: int | None
    completed_at: datetime
