from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class UserPayload(BaseModel):
    email: str
    display_name: str = Field(min_length=1, max_length=150)
    role: str = Field(default="Junior Statistical Officer (JSO)")
    email_validated: bool = Field(default=True)
    streak_count: int = Field(default=3)
    xp_points: int = Field(default=450)
    total_learning_hours: float = Field(default=12.5)


class ProfilePayload(BaseModel):
    designation: str = Field(min_length=1, max_length=150)
    department: str | None = Field(default="NSSO Field Operations Division", max_length=150)
    seniority_level: int = Field(default=2, ge=1, le=5)
    current_assignment: str | None = Field(default=None, max_length=255)
    education: str | None = None
    years_of_experience: int | None = Field(default=4, ge=0, le=80)
    previous_trainings: list[str] = Field(default_factory=list)
    target_role: str | None = Field(default=None, max_length=150)
    preferred_language: str = Field(default="en", min_length=2, max_length=10)


class AuthLoginRequest(BaseModel):
    email: str = Field(min_length=3, max_length=255)
    role: str | None = None


class AuthRegisterRequest(BaseModel):
    email: str = Field(min_length=3, max_length=255)
    display_name: str = Field(min_length=1, max_length=150)
    role: str = Field(min_length=1, max_length=150)
    department: str = Field(default="NSSO Field Operations Division")
    seniority_level: int = Field(default=2, ge=1, le=5)


class SwitchRoleRequest(BaseModel):
    user_id: int
    new_role: str


class UserAuthResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    user_id: int
    email: str
    display_name: str
    role: str
    email_validated: bool
    department: str | None
    seniority_level: int
    streak_count: int
    xp_points: int
    total_learning_hours: float
    is_active: bool


class ProfileUpsertRequest(BaseModel):
    user: UserPayload
    profile: ProfilePayload


class DomainCompetencyItem(BaseModel):
    id: str
    name: str
    domain: str
    current: int
    required: int
    gap: int
    priority: str
    status: str
    description: str


class IGOTCourseRecommendation(BaseModel):
    id: str
    title: str
    provider: str
    code: str
    competency: str
    target_gap: int
    priority: str
    estimated_hours: int
    target_goal_percent: int
    recommendation_rationale: str
    url: str


class ProfileResponse(ProfilePayload):
    model_config = ConfigDict(from_attributes=True)

    user_id: int
    email: str
    display_name: str
    overall_readiness: int = 74
    competency_profile: list[DomainCompetencyItem] = Field(default_factory=list)
    igot_recommendations: list[IGOTCourseRecommendation] = Field(default_factory=list)


class CompetencyProfileResponse(BaseModel):
    user_id: int
    display_name: str
    role: str
    overall_readiness: int
    competency_profile: list[DomainCompetencyItem]
    igot_recommendations: list[IGOTCourseRecommendation]


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
