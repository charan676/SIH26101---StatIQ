from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


DATABASE_PATH = Path(__file__).resolve().parent.parent / "statiq.db"
DATABASE_URL = f"sqlite:///{DATABASE_PATH.as_posix()}"

# SQLite needs this flag because FastAPI may serve requests from worker threads.
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
