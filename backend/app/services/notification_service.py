from app.repositories.notification_repository import (
    create_notification,
    get_notifications,
    mark_notification_read,
    delete_notification,
)


def create_new_notification(
    user_id: str,
    title: str,
    message: str,
):
    return create_notification(
        user_id,
        title,
        message,
    )


def fetch_notifications(
    user_id: str,
):
    return get_notifications(
        user_id,
    )


def read_notification(
    notification_id: str,
):
    return mark_notification_read(
        notification_id,
    )


def remove_notification(
    notification_id: str,
):
    return delete_notification(
        notification_id,
    )
