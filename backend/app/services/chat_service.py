from app.repositories.chat_repository import (
    send_message,
    get_conversation,
)


def send_new_message(
    sender_id: str,
    receiver_id: str,
    message: str,
):
    return send_message(
        sender_id,
        receiver_id,
        message,
    )


def fetch_conversation(
    user1: str,
    user2: str,
):
    return get_conversation(
        user1,
        user2,
    )
