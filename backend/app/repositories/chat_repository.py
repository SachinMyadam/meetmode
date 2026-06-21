import json
from uuid import uuid4
from datetime import datetime

from app.core.valkey_client import client


def send_message(
    sender_id: str,
    receiver_id: str,
    message: str,
):
    message_data = {
        "id": str(uuid4()),
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "message": message,
        "timestamp": datetime.utcnow().isoformat(),
    }

    client.set(
        f"message:{message_data['id']}",
        json.dumps(message_data),
    )

    return message_data


def get_conversation(
    user1: str,
    user2: str,
):
    messages = []

    for key in client.keys("message:*"):
        message = json.loads(client.get(key))

        if (
            message["sender_id"] == user1
            and message["receiver_id"] == user2
        ) or (
            message["sender_id"] == user2
            and message["receiver_id"] == user1
        ):
            messages.append(message)

    messages.sort(
        key=lambda x: x["timestamp"]
    )

    return messages
