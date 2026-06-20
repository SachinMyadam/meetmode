from app.repositories.auth_repository import (
    register_user,
    login_user,
)


def register_new_user(user):
    return register_user(user)


def login_existing_user(email, password):
    return login_user(email, password)