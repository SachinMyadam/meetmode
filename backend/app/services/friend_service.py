from app.repositories.friend_repository import (
    send_friend_request,
    get_pending_requests,
    update_friend_request_status,
    create_connection,
    get_connections,
)


def send_request(
    sender_id: str,
    receiver_id: str,
):
    return send_friend_request(
        sender_id,
        receiver_id,
    )


def fetch_pending_requests(
    receiver_id: str,
):
    return get_pending_requests(
        receiver_id,
    )


def accept_request(
    request_id: str,
):
    request = update_friend_request_status(
        request_id,
        "accepted",
    )

    if request is None:
        return None

    create_connection(
        request["sender_id"],
        request["receiver_id"],
    )

    create_connection(
        request["receiver_id"],
        request["sender_id"],
    )

    return request


def reject_request(
    request_id: str,
):
    return update_friend_request_status(
        request_id,
        "rejected",
    )


def fetch_connections(
    user_id: str,
):
    return get_connections(
        user_id,
    )
