import re
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Profile, StatisticalRole, User, UserCompetency, UserScore, Quiz, Competency
from ..schemas import (
    AuthLoginRequest,
    AuthRegisterRequest,
    ProfileResponse,
    ProfileUpsertRequest,
    SwitchRoleRequest,
    UserAuthResponse,
    DomainCompetencyItem,
    IGOTCourseRecommendation,
    CompetencyProfileResponse,
)

router = APIRouter(prefix="/api/profiles", tags=["profiles"])
auth_router = APIRouter(prefix="/api/auth", tags=["auth"])

ALLOWED_DOMAINS_REGEX = re.compile(r"^.+@(statiq\.ai|mospi\.gov\.in|gov\.in|nic\.in)$", re.IGNORECASE)

OFFICIAL_STATISTICAL_ROLES = [
    {"id": "dg", "name": "Director General", "category": "Executive Leadership", "default_level": 5},
    {"id": "adg", "name": "Additional Director General", "category": "Executive Leadership", "default_level": 5},
    {"id": "jd", "name": "Joint Director", "category": "Divisional Governance", "default_level": 4},
    {"id": "dd", "name": "Deputy Director", "category": "Regional Operations", "default_level": 4},
    {"id": "ad", "name": "Assistant Director", "category": "Survey & Design", "default_level": 3},
    {"id": "sso", "name": "Senior Statistical Officer (SSO)", "category": "Field Inspection", "default_level": 3},
    {"id": "jso", "name": "Junior Statistical Officer (JSO)", "category": "Primary Data Collection", "default_level": 2},
    {"id": "dpa", "name": "Data Processing Assistant", "category": "Data Operations", "default_level": 2},
    {"id": "foo", "name": "Field Operation Officer", "category": "Field Operations", "default_level": 2},
    {"id": "nas", "name": "National Accounts Specialist", "category": "Macroeconomic Accounts", "default_level": 4},
    {"id": "pia", "name": "Price Index Analyst", "category": "Price & Inflation Statistics", "default_level": 3},
    {"id": "sde", "name": "Survey Design Expert", "category": "Sampling & Survey Methodology", "default_level": 4},
    {"id": "ags", "name": "Agricultural Statistician", "category": "Sector Statistics", "default_level": 3},
    {"id": "iso", "name": "Industrial Statistics Officer", "category": "Economic Indicators", "default_level": 3},
    {"id": "dsa", "name": "Data Scientist / Analyst", "category": "Data Science & AI", "default_level": 4},
    {"id": "tcc", "name": "Trainer / Content Creator", "category": "Capacity Building", "default_level": 4},
    {"id": "sysa", "name": "System Administrator", "category": "IT & System Administration", "default_level": 4},
    {"id": "mob", "name": "Ministry Observer / Auditor", "category": "Monitoring & Evaluation", "default_level": 4},
]

FRAMEWORK_DOMAINS = [
    {
        "id": "comp_data_literacy",
        "name": "Data Literacy",
        "domain": "Core Statistical Methods",
        "base_current": 82,
        "description": "Ability to read, analyze, interpret, and communicate data as contextual information.",
    },
    {
        "id": "comp_stat_methods",
        "name": "Statistical Methods",
        "domain": "Core Statistical Methods",
        "base_current": 80,
        "description": "Sampling design, hypothesis testing, variance estimation, and econometric modeling.",
    },
    {
        "id": "comp_data_viz",
        "name": "Data Visualization",
        "domain": "Core Statistical Methods",
        "base_current": 78,
        "description": "Creating insightful official dashboards, charts, and public statistical publications.",
    },
    {
        "id": "comp_survey_method",
        "name": "Survey Methodology",
        "domain": "Field & Survey Engineering",
        "base_current": 85,
        "description": "Designing NSSO sample frames, questionnaire design, field auditing, and non-response adjustment.",
    },
    {
        "id": "comp_stat_software",
        "name": "Statistical Software",
        "domain": "Data Science & Computing",
        "base_current": 74,
        "description": "Proficiency in R, SPSS, STATA, and official MoSPI computation tools.",
    },
    {
        "id": "comp_python",
        "name": "Python",
        "domain": "Data Science & Computing",
        "base_current": 62,
        "description": "Pandas, NumPy, automated ETL data processing, and statistical scripting.",
    },
    {
        "id": "comp_sql",
        "name": "SQL",
        "domain": "Data Science & Computing",
        "base_current": 70,
        "description": "Relational database querying, aggregation, join optimization, and data warehousing.",
    },
    {
        "id": "comp_gis",
        "name": "GIS",
        "domain": "Geospatial & Advanced AI",
        "base_current": 55,
        "description": "Geographic Information Systems, spatial data analysis, and census mapping.",
    },
    {
        "id": "comp_aiml",
        "name": "AI/ML",
        "domain": "Geospatial & Advanced AI",
        "base_current": 42,
        "description": "Machine Learning models, predictive forecasting, automated anomaly detection in national data.",
    },
]

IGOT_CATALOG = {
    "AI/ML": {
        "id": "crs_igot_101",
        "title": "Applied Machine Learning for National Econometrics & MoSPI Statistics",
        "provider": "iGOT Karmayogi / NSSTA",
        "code": "NSSTA-ML-401",
        "estimated_hours": 18,
        "target_goal_percent": 85,
        "url": "https://igotkarmayogi.gov.in/course/nssta-ml-401",
    },
    "GIS": {
        "id": "crs_igot_102",
        "title": "Advanced Geospatial Analysis & GIS for Official Census & Sample Surveys",
        "provider": "iGOT Karmayogi / ISRO-IIRS",
        "code": "ISRO-GIS-202",
        "estimated_hours": 14,
        "target_goal_percent": 80,
        "url": "https://igotkarmayogi.gov.in/course/isro-gis-202",
    },
    "Python": {
        "id": "crs_igot_103",
        "title": "Python for Large-Scale Data Pipeline & NSSO Microdata Analysis",
        "provider": "iGOT Karmayogi / NIC Academy",
        "code": "NIC-PY-305",
        "estimated_hours": 16,
        "target_goal_percent": 80,
        "url": "https://igotkarmayogi.gov.in/course/nic-py-305",
    },
    "SQL": {
        "id": "crs_igot_104",
        "title": "Enterprise SQL & Data Warehousing for Government Databases",
        "provider": "iGOT Karmayogi / MeitY",
        "code": "MEITY-DB-104",
        "estimated_hours": 12,
        "target_goal_percent": 85,
        "url": "https://igotkarmayogi.gov.in/course/meity-db-104",
    },
    "Data Visualization": {
        "id": "crs_igot_105",
        "title": "Official Data Visualization Standards & Interactive Dashboards",
        "provider": "iGOT Karmayogi / MoSPI NSSTA",
        "code": "NSSTA-DV-101",
        "estimated_hours": 10,
        "target_goal_percent": 85,
        "url": "https://igotkarmayogi.gov.in/course/nssta-dv-101",
    },
    "Survey Methodology": {
        "id": "crs_igot_106",
        "title": "NSSO Sample Framing & Field Survey Engineering Mechanics",
        "provider": "iGOT Karmayogi / NSSTA",
        "code": "NSSTA-SV-201",
        "estimated_hours": 15,
        "target_goal_percent": 90,
        "url": "https://igotkarmayogi.gov.in/course/nssta-sv-201",
    },
    "Statistical Methods": {
        "id": "crs_igot_107",
        "title": "Macroeconomic Aggregates & National Accounts Statistics (SNA 2008)",
        "provider": "iGOT Karmayogi / MoSPI",
        "code": "MOSPI-NA-301",
        "estimated_hours": 20,
        "target_goal_percent": 85,
        "url": "https://igotkarmayogi.gov.in/course/mospi-na-301",
    },
}


def calculate_user_competency_profile(user: User, db: Session):
    seniority = user.profile.seniority_level if user.profile else 2
    base_required = 60 if seniority <= 1 else 75 if seniority == 2 else 82 if seniority == 3 else 88 if seniority == 4 else 95

    user_scores = db.query(UserScore).filter(UserScore.user_id == user.id).all()
    avg_db_score = None
    if user_scores:
        avg_db_score = round(sum(s.score_percent for s in user_scores) / len(user_scores))

    items: list[DomainCompetencyItem] = []
    igot_recs: list[IGOTCourseRecommendation] = []

    for f_dom in FRAMEWORK_DOMAINS:
        req = base_required
        cur = f_dom["base_current"]
        if avg_db_score is not None:
            cur = round((cur + avg_db_score) / 2)

        gap = max(0, req - cur)
        priority = "Critical" if gap >= 25 else "High" if gap >= 15 else "Moderate" if gap >= 5 else "Strong"
        status = "Proficient" if gap == 0 else "Developing" if gap < 15 else "Needs Action" if gap < 25 else "Critical Gap"

        item = DomainCompetencyItem(
            id=f_dom["id"],
            name=f_dom["name"],
            domain=f_dom["domain"],
            current=cur,
            required=req,
            gap=gap,
            priority=priority,
            status=status,
            description=f_dom["description"],
        )
        items.append(item)

        if gap > 0 and f_dom["name"] in IGOT_CATALOG:
            cat = IGOT_CATALOG[f_dom["name"]]
            igot_recs.append(IGOTCourseRecommendation(
                id=cat["id"],
                title=cat["title"],
                provider=cat["provider"],
                code=cat["code"],
                competency=f_dom["name"],
                target_gap=gap,
                priority=priority,
                estimated_hours=cat["estimated_hours"],
                target_goal_percent=cat["target_goal_percent"],
                recommendation_rationale=f"Addresses identified {priority} Gap of {gap} points in {f_dom['name']} required for {user.role}.",
                url=cat["url"],
            ))

    igot_recs.sort(key=lambda r: r.target_gap, reverse=True)
    readiness_score = round(sum(item.current for item in items) / len(items))

    return readiness_score, items, igot_recs


def build_user_auth_response(user: User) -> UserAuthResponse:
    dept = user.profile.department if user.profile else "NSSO Field Operations Division"
    level = user.profile.seniority_level if user.profile else 2
    return UserAuthResponse(
        user_id=user.id,
        email=user.email,
        display_name=user.display_name,
        role=user.role,
        email_validated=user.email_validated,
        department=dept,
        seniority_level=level,
        streak_count=user.streak_count,
        xp_points=user.xp_points,
        total_learning_hours=user.total_learning_hours,
        is_active=user.is_active,
    )


@auth_router.get("/roles")
def get_roles():
    """Retrieve all 18 official statistical roles for India's Official Statistical System."""
    return {"roles": OFFICIAL_STATISTICAL_ROLES}


@auth_router.post("/login", response_model=UserAuthResponse)
def login(payload: AuthLoginRequest, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    is_valid_domain = bool(ALLOWED_DOMAINS_REGEX.match(email))
    user = db.query(User).filter(User.email == email).first()
    if not user:
        name = email.split("@")[0].replace(".", " ").title()
        role_name = payload.role or StatisticalRole.JUNIOR_STATISTICAL_OFFICER.value
        user = User(
            email=email,
            display_name=name,
            role=role_name,
            email_validated=is_valid_domain,
            streak_count=3,
            xp_points=350,
            total_learning_hours=8.5,
        )
        user.profile = Profile(
            designation=role_name,
            department="NSSO Field Operations Division",
            seniority_level=2,
            years_of_experience=4,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        user.email_validated = is_valid_domain
        if payload.role:
            user.role = payload.role
        db.commit()
        db.refresh(user)

    return build_user_auth_response(user)


@auth_router.post("/register", response_model=UserAuthResponse)
def register(payload: AuthRegisterRequest, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if user:
        user.display_name = payload.display_name
        user.role = payload.role
        if user.profile:
            user.profile.department = payload.department
            user.profile.seniority_level = payload.seniority_level
            user.profile.designation = payload.role
        db.commit()
        db.refresh(user)
        return build_user_auth_response(user)

    is_valid_domain = bool(ALLOWED_DOMAINS_REGEX.match(email))
    user = User(
        email=email,
        display_name=payload.display_name,
        role=payload.role,
        email_validated=is_valid_domain,
        streak_count=1,
        xp_points=100,
        total_learning_hours=0.0,
    )
    user.profile = Profile(
        designation=payload.role,
        department=payload.department,
        seniority_level=payload.seniority_level,
        years_of_experience=2,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return build_user_auth_response(user)


@auth_router.post("/switch-role", response_model=UserAuthResponse)
def switch_role(payload: SwitchRoleRequest, db: Session = Depends(get_db)):
    user = db.get(User, payload.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = payload.new_role
    if user.profile:
        user.profile.designation = payload.new_role
    db.commit()
    db.refresh(user)
    return build_user_auth_response(user)


@auth_router.get("/me/{user_id}", response_model=UserAuthResponse)
def get_me(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return build_user_auth_response(user)


def as_response(user: User, db: Session) -> ProfileResponse:
    if user.profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")

    readiness, comp_profile, igot_recs = calculate_user_competency_profile(user, db)

    return ProfileResponse(
        user_id=user.id,
        email=user.email,
        display_name=user.display_name,
        overall_readiness=readiness,
        competency_profile=comp_profile,
        igot_recommendations=igot_recs,
        **{
            field: getattr(user.profile, field)
            for field in ProfileResponse.model_fields
            if field not in {"user_id", "email", "display_name", "overall_readiness", "competency_profile", "igot_recommendations"}
        },
    )


@router.get("/{user_id}", response_model=ProfileResponse)
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return as_response(user, db)


@router.get("/{user_id}/competencies", response_model=CompetencyProfileResponse)
def get_user_competency_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    readiness, comp_profile, igot_recs = calculate_user_competency_profile(user, db)
    return CompetencyProfileResponse(
        user_id=user.id,
        display_name=user.display_name,
        role=user.role,
        overall_readiness=readiness,
        competency_profile=comp_profile,
        igot_recommendations=igot_recs,
    )


@router.put("/{user_id}", response_model=ProfileResponse)
def update_profile(user_id: int, payload: ProfileUpsertRequest, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if user is None:
        user = User(id=user_id, email=payload.user.email.lower(), display_name=payload.user.display_name, role=payload.user.role)
        db.add(user)
    else:
        user.email = payload.user.email.lower()
        user.display_name = payload.user.display_name
        user.role = payload.user.role

    profile_values = payload.profile.model_dump()
    if user.profile is None:
        user.profile = Profile(**profile_values)
    else:
        for name, value in profile_values.items():
            setattr(user.profile, name, value)

    db.commit()
    db.refresh(user)
    return as_response(user, db)
