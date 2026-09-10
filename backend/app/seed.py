from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import Competency, CompetencyDomain, Profile, StatisticalRole, User


OFFICIAL_STATISTICS_COMPETENCIES = [
    ("survey-design", "Survey Design", CompetencyDomain.SURVEY_DESIGN),
    ("sampling-methodology", "Sampling Methodology", CompetencyDomain.SAMPLING),
    ("national-accounts", "National Accounts", CompetencyDomain.NATIONAL_ACCOUNTS),
    ("price-statistics", "Price Statistics", CompetencyDomain.PRICE_STATISTICS),
    ("labour-statistics", "Labour Statistics", CompetencyDomain.LABOUR_STATISTICS),
    ("agricultural-statistics", "Agricultural Statistics", CompetencyDomain.AGRICULTURAL_STATISTICS),
    ("industrial-statistics", "Industrial Statistics", CompetencyDomain.INDUSTRIAL_STATISTICS),
    ("sdg-indicators", "SDG Indicators", CompetencyDomain.SDG_INDICATORS),
    ("metadata-standards", "Metadata Standards", CompetencyDomain.METADATA_STANDARDS),
    ("data-quality-frameworks", "Data Quality Frameworks", CompetencyDomain.DATA_QUALITY_FRAMEWORKS),
    ("data-science-computing", "Data Science & Computing", CompetencyDomain.DATA_SCIENCE_AND_COMPUTING),
    ("gis-spatial-analysis", "GIS & Spatial Analysis", CompetencyDomain.GIS_AND_SPATIAL_ANALYSIS),
    ("ai-machine-learning", "AI & Machine Learning", CompetencyDomain.AI_AND_MACHINE_LEARNING),
]

DEMO_USERS = [
    {
        "id": 1,
        "email": "testuser@mospi.gov.in",
        "display_name": "Rajesh Sharma (JSO)",
        "role": StatisticalRole.JUNIOR_STATISTICAL_OFFICER.value,
        "email_validated": True,
        "streak_count": 5,
        "xp_points": 650,
        "total_learning_hours": 14.5,
        "department": "NSSO Field Operations Division",
        "seniority_level": 2,
    },
    {
        "id": 2,
        "email": "officer@mospi.gov.in",
        "display_name": "Priya Verma (SSO)",
        "role": StatisticalRole.SENIOR_STATISTICAL_OFFICER.value,
        "email_validated": True,
        "streak_count": 7,
        "xp_points": 1200,
        "total_learning_hours": 28.0,
        "department": "National Accounts Division",
        "seniority_level": 3,
    },
    {
        "id": 3,
        "email": "trainer@nssta.gov.in",
        "display_name": "Dr. Arisudan Singh (Trainer)",
        "role": StatisticalRole.TRAINER_CONTENT_CREATOR.value,
        "email_validated": True,
        "streak_count": 12,
        "xp_points": 2400,
        "total_learning_hours": 45.0,
        "department": "National Statistical Systems Training Academy (NSSTA)",
        "seniority_level": 4,
    },
    {
        "id": 4,
        "email": "admin@mospi.gov.in",
        "display_name": "Sanjay Kumar (Director General)",
        "role": StatisticalRole.DIRECTOR_GENERAL.value,
        "email_validated": True,
        "streak_count": 15,
        "xp_points": 3500,
        "total_learning_hours": 60.0,
        "department": "Ministry of Statistics & Programme Implementation",
        "seniority_level": 5,
    },
]


def seed_competencies(db: Session) -> None:
    existing_codes = set(db.scalars(select(Competency.code)).all())
    additions = [
        Competency(code=code, name=name, domain=domain)
        for code, name, domain in OFFICIAL_STATISTICS_COMPETENCIES
        if code not in existing_codes
    ]
    if additions:
        db.add_all(additions)
        db.commit()

    for udata in DEMO_USERS:
        existing_user = db.get(User, udata["id"]) or db.query(User).filter(User.email == udata["email"]).first()
        if not existing_user:
            user = User(
                id=udata["id"],
                email=udata["email"],
                display_name=udata["display_name"],
                role=udata["role"],
                email_validated=udata["email_validated"],
                streak_count=udata["streak_count"],
                xp_points=udata["xp_points"],
                total_learning_hours=udata["total_learning_hours"],
            )
            user.profile = Profile(
                designation=udata["role"],
                department=udata["department"],
                seniority_level=udata["seniority_level"],
                years_of_experience=udata["seniority_level"] * 3,
            )
            db.add(user)
    db.commit()
