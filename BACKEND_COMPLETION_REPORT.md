# StatIQ Backend Completion Report

## 1. Database State

`backend/statiq.db` is initialized with the `users`, `profiles`, `competencies`, `user_competencies`, `quizzes`, and `user_scores` tables. The competency catalogue is seeded with active codes: `survey-design`, `sampling-methodology`, `national-accounts`, `price-statistics`, `labour-statistics`, `agricultural-statistics`, `industrial-statistics`, `sdg-indicators`, `metadata-standards`, `data-quality-frameworks`, `data-science-computing`, `gis-spatial-analysis`, and `ai-machine-learning`. `Quiz.questions` persists generated MCQs as JSON; `UserScore` persists each submitted result, selected answers, correct count, percentage, and completion time. When `/api/quizzes/generate` receives an unknown `created_by_user_id`, it provisions/reuses the development test user (`id=1`, `testuser@statiq.ai`) and assigns ownership to that user. The current user table schema contains no password column.

## 2. Completed Endpoints

### `POST /api/quizzes/generate`

Accepts an uploaded PDF (and UTF-8 text uploads), validates a 10 MB size limit, extracts PDF text through `pypdf`, normalizes text to UTF-8-safe NFC Unicode, and rejects empty/scanned PDFs without extractable text. It loads `GEMINI_API_KEY` and `GEMINI_MODEL` from `backend/.env`; the configured model is `gemini-3.6-flash`. The endpoint calls `google-genai` via `client.models.generate_content`, provides MoSPI Official Statistical System context (including sampling, national accounts, SDG indicators, metadata, quality, and sector statistics), and requests JSON. Gemini output is parsed from `response.text`, must contain a top-level `quizzes` array, and is validated with the strict Pydantic MCQ shape: `question`, four distinct `options`, zero-based `correct_answer`, and `explanation`. The validated array is persisted to the existing SQLite `Quiz.questions` JSON column and returned as the API response's `questions` list.

### `POST /api/quizzes/submit`

Accepts `user_id`, `quiz_id`, and an ordered `answers` array of selected option indices. It loads the user and quiz, requires exactly one answer per stored question, validates each selected option index, compares choices to each question's `correct_answer`, and computes `score_percent`, `correct_answers`, and `total_questions`. It writes the result to `user_scores`. For competency-linked quizzes, it creates or updates `user_competencies`, increases the measured level by `round(score_percent / 10)` up to 100, records the assessment timestamp, and returns the current level, required level, and calculated `remaining_gap` alongside the final score.

## 3. Current Operational Flow

1. Configure `backend/.env` with `GEMINI_API_KEY` and `GEMINI_MODEL=gemini-3.6-flash`.
2. In Swagger, submit a PDF plus an optional seeded `competency_code` (for example, `sampling-methodology`) to `POST /api/quizzes/generate`; use `created_by_user_id=1` for the test user, or let a missing supplied ID resolve to that user.
3. The backend extracts and normalizes source text, generates source-grounded MoSPI-aligned MCQs through Gemini, validates their JSON schema, and stores the quiz.
4. Submit the generated `quiz_id`, a valid `user_id`, and an answer array such as `[0, 2, 1, 3, 0]` to `POST /api/quizzes/submit`.
5. The backend saves the score, updates competency progress when applicable, and returns the score plus gap metrics for the user interface.
