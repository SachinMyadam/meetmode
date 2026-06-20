from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.core.dependencies import get_current_user
from app.services.auth_service import (
    register_new_user,
    login_existing_user,
)
from app.schemas.user import UserCreate

router = APIRouter()


@router.post("/register")
def register(user: UserCreate):
    created_user = register_new_user(user)

    if created_user is None:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    return created_user


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    token = login_existing_user(
        form_data.username,
        form_data.password,
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return token


@router.get("/me")
def get_me(
    email: str = Depends(get_current_user),
):
    return {
        "email": email
    }