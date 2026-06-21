from app.repositories.user_repository import (
    get_all_users,
)


def discover_users(
    current_user_id: str,
):
    users = get_all_users()

    results = []

    for user in users:
        if user["id"] != current_user_id:
            results.append(user)

    return results


def recommended_users(
    current_user_id: str,
):
    users = discover_users(
        current_user_id,
    )

    users.sort(
        key=lambda user: len(user["skills"]),
        reverse=True,
    )

    return users
