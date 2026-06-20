from app.repositories.user_repository import (
    create_user,
    get_all_users,
    get_user,
    update_user,
    delete_user,
    search_users,
    get_users_paginated,
)


def create_new_user(user):
    return create_user(user)


def fetch_all_users():
    return get_all_users()


def fetch_user(user_id: str):
    return get_user(user_id)


def update_existing_user(user_id: str, user):
    return update_user(user_id, user)


def delete_existing_user(user_id: str):
    return delete_user(user_id)


def search_all_users(skill=None, profession=None, status=None):
    return search_users(skill, profession, status)


def fetch_users_paginated(page: int, limit: int):
    return get_users_paginated(page, limit)