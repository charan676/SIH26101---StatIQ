from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Profile, User
from ..schemas import ProfileResponse, ProfileUpsertRequest


router = APIRouter(prefix="/api/profiles", tags=["profiles"])


def as_response(user: User) -> ProfileResponse:
    if user.profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return ProfileResponse(
        user_id=user.id,
        email=user.email,
        display_name=user.display_name,
        **{
            field: getattr(user.profile, field)
            for field in ProfileResponse.model_fields
            if field not in {"user_id", "email", "display_name"}
        },
    )


@router.get("/{user_id}", response_model=ProfileResponse)
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return as_response(user)


@router.put("/{user_id}", response_model=ProfileResponse)
def update_profile(user_id: int, payload: ProfileUpsertRequest, db: Session = Depends(get_db)):
    """Create or update a user's profile and qualifications from an authenticated-client payload."""
    user = db.get(User, user_id)
    if user is None:
        user = User(id=user_id, email=payload.user.email.lower(), display_name=payload.user.display_name)
        db.add(user)
    else:
        user.email = payload.user.email.lower()
        user.display_name = payload.user.display_name

    profile_values = payload.profile.model_dump()
    if user.profile is None:
        user.profile = Profile(**profile_values)
    else:
        for name, value in profile_values.items():
            setattr(user.profile, name, value)

    db.commit()
    db.refresh(user)
    return as_response(user)
