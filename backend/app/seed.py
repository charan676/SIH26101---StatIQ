from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import Competency, CompetencyDomain


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
