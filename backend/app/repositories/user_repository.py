import json
from uuid import uuid4

from app.core.valkey_client import client


def create_user(user):
    user_data = user.model_dump()

    user_id = str(uuid4())
    user_data["id"] = user_id

    client.set(
        f"user:{user_id}",
        json.dumps(user_data),
    )

    return user_data


def get_all_users():
    users = []

    for key in client.keys("user:*"):
        data = client.get(key)

        if data:
            users.append(json.loads(data))

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
        json.dumps(updated_user),
    )

    return updated_user


def delete_user(user_id: str):
    existing_user = get_user(user_id)

    if not existing_user:
        return None

    client.delete(f"user:{user_id}")

    return existing_user


def search_users(skill=None, profession=None, status=None):
    users = get_all_users()

    results = []

    for user in users:
        if skill:
            if skill.lower() not in [
                s.lower() for s in user.get("skills", [])
            ]:
                continue

        if profession:
            if user.get("profession", "").lower() != profession.lower():
                continue

        if status:
            if user.get("status", "").lower() != status.lower():
                continue

        results.append(user)

    return results


def get_users_paginated(page: int, limit: int):
    users = get_all_users()

    start = (page - 1) * limit
    end = start + limit

    return users[start:end]


def get_user_by_email(email: str):
    users = get_all_users()

    for user in users:
        if user.get("email") == email:
            return user

    return None
