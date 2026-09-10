# StatIQ backend

FastAPI and SQLite foundation for the SIH26101 platform.

## Run locally

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python scripts/init_db.py
uvicorn app.main:app --reload
```

The API is available at `http://127.0.0.1:8000`; interactive API docs are at `/docs`.

## Database initialization

`app.main` auto-creates missing tables and seeds the official-statistics competency catalogue during FastAPI startup. `scripts/init_db.py` provides the same idempotent setup for local development or deployment initialization.

The schema includes `users`, `profiles`, `competencies`, `user_competencies`, `quizzes`, and `user_scores`. `user_competencies` records each official's measured and required competency levels, enabling skill-gap calculation without duplicating the competency catalogue.

## Core API routes

- `GET /api/profiles/{user_id}` — retrieve an official's profile.
- `PUT /api/profiles/{user_id}` — create or update an official's designation, qualifications, experience, training, and target role.
- `POST /api/quizzes/generate` — accepts a PDF or UTF-8 text upload and generates/saves source-grounded MCQs. Configure `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) before using it.
- `POST /api/quizzes/submit` — scores submitted answers, persists the attempt, and updates the competency's measured level and remaining gap.
