import json
from uuid import uuid4

from app.core.valkey_client import client


def create_user(user):
    user_data = user.model_dump()

    user_id = str(uuid4())

    user_data["id"] = user_id

    client.set(
        f"user:{user_id}",
        json.dumps(user_data)
    )

    return user_data


def get_all_users():
    users = []

    for key in client.keys("user:*"):
        user = json.loads(client.get(key))
        users.append(user)

    return users


def get_user(user_id: str):
    data = client.get(f"user:{user_id}")

    if data:
        return json.loads(data)

    return None


def update_user(user_id: str, user):
    existing_user = get_user(user_id)

    if not existing_user:
        return None

    updated_user = user.model_dump()
    updated_user["id"] = user_id

    client.set(
        f"user:{user_id}",
        json.dumps(updated_user)
    )

    return updated_user