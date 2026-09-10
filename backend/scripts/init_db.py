"""Create/update the local SQLite schema and seed official-statistics competencies.

Run from backend: python scripts/init_db.py
"""
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

from app.database import Base, SessionLocal, engine  # noqa: E402
from app.seed import seed_competencies  # noqa: E402


def main() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_competencies(db)
    print(f"SQLite database initialized at {BACKEND_DIR / 'statiq.db'}")


if __name__ == "__main__":
    main()
