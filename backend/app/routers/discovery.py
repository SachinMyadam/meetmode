from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.discovery_service import (
    fetch_discover_users,
    fetch_recommended_users,
)

router = APIRouter(
    prefix="/discover",
    tags=["Discovery"],
)


@router.get("")
def discover(
    current_user=Depends(get_current_user),
):
    return fetch_discover_users(
        current_user["id"],
    )


@router.get("/recommended")
def recommended(
    current_user=Depends(get_current_user),
):
    return fetch_recommended_users(
        current_user["id"],
    )
