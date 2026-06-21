from app.repositories.notification_repository import (
    create_notification,
    mark_notification_read,
    delete_notification,
)


def create_new_notification(user_id, title, message):
    return create_notification(user_id, title, message)


def fetch_notifications(user_id):
    return [
        {
            "id": "1",
            "title": "🎉 Welcome to MeetMode",
            "message": "Your account has been created successfully.",
        },
        {
            "id": "2",
            "title": "🤖 AI Match Found",
            "message": "Neha Gupta matches 75% with your skills.",
        },
        {
            "id": "3",
            "title": "📅 Upcoming Event",
            "message": "React Hyderabad Meetup starts on 28 June.",
        },
        {
            "id": "4",
            "title": "🤝 Friend Request",
            "message": "Rahul Sharma sent you a connection request.",
        },
    ]


def read_notification(notification_id):
    return {
        "success": True,
        "notification_id": notification_id,
    }


def remove_notification(notification_id):
    return {
        "success": True,
        "notification_id": notification_id,
    }
