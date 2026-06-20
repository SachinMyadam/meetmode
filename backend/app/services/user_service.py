from app.repositories.user_repository import (
    create_user,
    get_all_users,
    get_user,
)


def create_new_user(user):
    return create_user(user)


def fetch_all_users():
    return get_all_users()


def fetch_user(user_id: str):
    return get_user(user_id)