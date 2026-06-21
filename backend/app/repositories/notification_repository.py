import json
from uuid import uuid4

from app.core.valkey_client import client


def create_notification(
    user_id: str,
    title: str,
    message: str,
):
    notification = {
        "id": str(uuid4()),
        "user_id": user_id,
        "title": title,
        "message": message,
        "is_read": False,
    }

    client.set(
        f"notification:{notification['id']}",
        json.dumps(notification),
    )

    return notification


def get_notifications(
    user_id: str,
):
    notifications = []

    for key in client.keys("notification:*"):
        notification = json.loads(
            client.get(key)
        )

        if notification["user_id"] == user_id:
            notifications.append(
                notification
            )

    return notifications


def mark_notification_read(
    notification_id: str,
):
    data = client.get(
        f"notification:{notification_id}"
    )

    if data is None:
        return None

    notification = json.loads(data)

    notification["is_read"] = True

    client.set(
        f"notification:{notification_id}",
        json.dumps(notification),
    )

    return notification


def delete_notification(
    notification_id: str,
):
    data = client.get(
        f"notification:{notification_id}"
    )

    if data is None:
        return None

    notification = json.loads(data)

    client.delete(
        f"notification:{notification_id}"
    )

    return notification
