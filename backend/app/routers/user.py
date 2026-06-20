from fastapi import APIRouter

from app.schemas.user import UserCreate, UserUpdate
from app.services.user_service import (
    create_new_user,
    fetch_all_users,
    fetch_user,
    update_existing_user,
)

router = APIRouter()


@router.post("/users")
def create_user(user: UserCreate):
    return create_new_user(user)


@router.get("/users")
def get_users():
    return fetch_all_users()


@router.get("/users/{user_id}")
def get_single_user(user_id: str):
    user = fetch_user(user_id)

    if user:
        return user

    return {
        "message": "User not found"
    }


@router.put("/users/{user_id}")
def update_user(user_id: str, user: UserUpdate):
    updated_user = update_existing_user(user_id, user)

    if updated_user:
        return updated_user

    return {
        "message": "User not found"
    }