import json
from uuid import uuid4

from app.core.auth import create_access_token
from app.core.security import hash_password, verify_password
from app.core.valkey_client import client


def register_user(user):
    existing_user = client.get(f"email:{user.email}")

    if existing_user:
        return None

    user_data = user.model_dump()

    user_id = str(uuid4())

    user_data["id"] = user_id
    user_data["password"] = hash_password(user.password)

    client.set(
        f"user:{user_id}",
        json.dumps(user_data)
    )

    client.set(
        f"email:{user.email}",
        user_id
    )

    return user_data


def login_user(email: str, password: str):
    user_id = client.get(f"email:{email}")

    if not user_id:
        return None

    user = json.loads(
        client.get(f"user:{user_id}")
    )

    if not verify_password(
        password,
        user["password"],
    ):
        return None

    token = create_access_token(
        {
            "sub": user["email"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }