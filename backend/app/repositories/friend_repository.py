import json
from uuid import uuid4

from app.core.valkey_client import client


def send_friend_request(sender_id: str, receiver_id: str):
    request = {
        "id": str(uuid4()),
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "status": "pending",
    }

    client.set(
        f"friend_request:{request['id']}",
        json.dumps(request),
    )

    return request


def get_friend_request(request_id: str):
    data = client.get(f"friend_request:{request_id}")

    if data:
        return json.loads(data)

    return None


def get_pending_requests(receiver_id: str):
    requests = []

    for key in client.keys("friend_request:*"):
        request = json.loads(client.get(key))

        if (
            request["receiver_id"] == receiver_id
            and request["status"] == "pending"
        ):
            requests.append(request)

    return requests


def update_friend_request_status(
    request_id: str,
    status: str,
):
    request = get_friend_request(request_id)

    if not request:
        return None

    request["status"] = status

    client.set(
        f"friend_request:{request_id}",
        json.dumps(request),
    )

    return request


def create_connection(
    user_id: str,
    connected_user_id: str,
):
    connection = {
        "user_id": user_id,
        "connected_user_id": connected_user_id,
    }

    client.set(
        f"connection:{user_id}:{connected_user_id}",
        json.dumps(connection),
    )

    return connection


def get_connections(user_id: str):
    connections = []

    for key in client.keys(f"connection:{user_id}:*"):
        connection = json.loads(client.get(key))
        connections.append(connection)

    return connections
