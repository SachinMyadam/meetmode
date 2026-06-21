from app.repositories.event_repository import (
    create_event,
    get_all_events,
    get_event,
    update_event,
    delete_event,
    join_event,
    get_my_events,
)


def create_new_event(
    event,
    user_id: str,
):
    return create_event(
        event,
        user_id,
    )


def fetch_all_events():
    return get_all_events()


def fetch_event(
    event_id: str,
):
    return get_event(
        event_id,
    )


def update_existing_event(
    event_id: str,
    event,
):
    return update_event(
        event_id,
        event,
    )


def delete_existing_event(
    event_id: str,
):
    return delete_event(
        event_id,
    )


def join_existing_event(
    event_id: str,
    user_id: str,
):
    return join_event(
        event_id,
        user_id,
    )


def fetch_my_events(
    user_id: str,
):
    return get_my_events(
        user_id,
    )
