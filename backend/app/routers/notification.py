from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_current_user
from app.services.notification_service import (
    fetch_notifications,
    read_notification,
    remove_notification,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get("")
def get_all_notifications(
    current_user=Depends(get_current_user),
):
    return fetch_notifications(
        current_user["id"],
    )


@router.put("/{notification_id}/read")
def mark_notification_read(
    notification_id: str,
):
    notification = read_notification(
        notification_id,
    )

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    return notification


@router.delete("/{notification_id}")
def delete_notification(
    notification_id: str,
):
    notification = remove_notification(
        notification_id,
    )

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    return notification
