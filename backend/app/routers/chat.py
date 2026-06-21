from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.schemas.chat import MessageCreate
from app.services.chat_service import (
    send_new_message,
    fetch_conversation,
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/send")
def send_chat_message(
    message: MessageCreate,
    current_user=Depends(get_current_user),
):
    return send_new_message(
        current_user["id"],
        message.receiver_id,
        message.message,
    )


@router.get("/{user_id}")
def get_chat(
    user_id: str,
    current_user=Depends(get_current_user),
):
    return fetch_conversation(
        current_user["id"],
        user_id,
    )
