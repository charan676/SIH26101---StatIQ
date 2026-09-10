import enum
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, JSON, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class CompetencyDomain(str, enum.Enum):
    SURVEY_DESIGN = "Survey Design"
    SAMPLING = "Sampling"
    NATIONAL_ACCOUNTS = "National Accounts"
    PRICE_STATISTICS = "Price Statistics"
    LABOUR_STATISTICS = "Labour Statistics"
    AGRICULTURAL_STATISTICS = "Agricultural Statistics"
    INDUSTRIAL_STATISTICS = "Industrial Statistics"
    SDG_INDICATORS = "SDG Indicators"
    METADATA_STANDARDS = "Metadata Standards"
    DATA_QUALITY_FRAMEWORKS = "Data Quality Frameworks"
    DATA_SCIENCE_AND_COMPUTING = "Data Science & Computing"
    GIS_AND_SPATIAL_ANALYSIS = "GIS & Spatial Analysis"
    AI_AND_MACHINE_LEARNING = "AI & Machine Learning"


class StatisticalRole(str, enum.Enum):
    DIRECTOR_GENERAL = "Director General"
    ADDITIONAL_DIRECTOR_GENERAL = "Additional Director General"
    JOINT_DIRECTOR = "Joint Director"
    DEPUTY_DIRECTOR = "Deputy Director"
    ASSISTANT_DIRECTOR = "Assistant Director"
    SENIOR_STATISTICAL_OFFICER = "Senior Statistical Officer (SSO)"
    JUNIOR_STATISTICAL_OFFICER = "Junior Statistical Officer (JSO)"
    DATA_PROCESSING_ASSISTANT = "Data Processing Assistant"
    FIELD_OPERATION_OFFICER = "Field Operation Officer"
    NATIONAL_ACCOUNTS_SPECIALIST = "National Accounts Specialist"
    PRICE_INDEX_ANALYST = "Price Index Analyst"
    SURVEY_DESIGN_EXPERT = "Survey Design Expert"
    AGRICULTURAL_STATISTICIAN = "Agricultural Statistician"
    INDUSTRIAL_STATISTICS_OFFICER = "Industrial Statistics Officer"
    DATA_SCIENTIST_ANALYST = "Data Scientist / Analyst"
    TRAINER_CONTENT_CREATOR = "Trainer / Content Creator"
    SYSTEM_ADMINISTRATOR = "System Administrator"
    MINISTRY_OBSERVER = "Ministry Observer / Auditor"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    display_name: Mapped[str] = mapped_column(String(150))
    role: Mapped[str] = mapped_column(String(100), default=StatisticalRole.JUNIOR_STATISTICAL_OFFICER.value, nullable=False)
    email_validated: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    streak_count: Mapped[int] = mapped_column(Integer, default=3, nullable=False)
    xp_points: Mapped[int] = mapped_column(Integer, default=450, nullable=False)
    total_learning_hours: Mapped[float] = mapped_column(default=12.5, nullable=False)
    last_active_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), server_default=func.now())
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    profile: Mapped["Profile"] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")
    competency_levels: Mapped[list["UserCompetency"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    scores: Mapped[list["UserScore"]] = relationship(back_populates="user", cascade="all, delete-orphan")


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    designation: Mapped[str] = mapped_column(String(150))
    department: Mapped[str | None] = mapped_column(String(150), default="NSSO Field Operations Division")
    seniority_level: Mapped[int] = mapped_column(Integer, default=2, nullable=False) # Level 1 (Junior) to 5 (Senior/Expert)
    current_assignment: Mapped[str | None] = mapped_column(String(255))
    education: Mapped[str | None] = mapped_column(Text)
    years_of_experience: Mapped[int | None] = mapped_column(Integer, default=4)
    previous_trainings: Mapped[list | None] = mapped_column(JSON, default=list)
    target_role: Mapped[str | None] = mapped_column(String(150))
    preferred_language: Mapped[str] = mapped_column(String(10), default="en", nullable=False)

    user: Mapped[User] = relationship(back_populates="profile")


class Competency(Base):
    __tablename__ = "competencies"
    __table_args__ = (UniqueConstraint("code", name="uq_competencies_code"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(80), nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    domain: Mapped[CompetencyDomain] = mapped_column(Enum(CompetencyDomain), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    user_levels: Mapped[list["UserCompetency"]] = relationship(back_populates="competency")


class UserCompetency(Base):
    """An official's measured level and role target for a competency."""

    __tablename__ = "user_competencies"
    __table_args__ = (UniqueConstraint("user_id", "competency_id", name="uq_user_competency"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    competency_id: Mapped[int] = mapped_column(ForeignKey("competencies.id", ondelete="CASCADE"), nullable=False)
    current_level: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    required_level: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    last_assessed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped[User] = relationship(back_populates="competency_levels")
    competency: Mapped[Competency] = relationship(back_populates="user_levels")


class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    competency_id: Mapped[int | None] = mapped_column(ForeignKey("competencies.id", ondelete="SET NULL"))
    source_material_name: Mapped[str | None] = mapped_column(String(255))
    questions: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    duration_minutes: Mapped[int] = mapped_column(Integer, default=15, nullable=False)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_by_user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    scores: Mapped[list["UserScore"]] = relationship(back_populates="quiz")


class UserScore(Base):
    __tablename__ = "user_scores"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id", ondelete="CASCADE"), nullable=False, index=True)
    score_percent: Mapped[float] = mapped_column(nullable=False)
    correct_answers: Mapped[int] = mapped_column(Integer, nullable=False)
    total_questions: Mapped[int] = mapped_column(Integer, nullable=False)
    answers: Mapped[dict | None] = mapped_column(JSON)
    completed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user: Mapped[User] = relationship(back_populates="scores")
    quiz: Mapped[Quiz] = relationship(back_populates="scores")
