from app.repositories.discovery_repository import (
    discover_users,
    recommended_users,
)


def fetch_discover_users(
    current_user_id: str,
):
    return discover_users(
        current_user_id,
    )


def fetch_recommended_users(
    current_user_id: str,
):
    return recommended_users(
        current_user_id,
    )
