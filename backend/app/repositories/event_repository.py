import json
from uuid import uuid4

from app.core.valkey_client import client


def create_event(event, user_id: str):
    event_data = event.model_dump()

    event_id = str(uuid4())

    event_data["id"] = event_id
    event_data["created_by"] = user_id
    event_data["participants"] = [user_id]

    client.set(
        f"event:{event_id}",
        json.dumps(event_data),
    )

    return event_data


def get_all_events():
    events = []

    for key in client.keys("event:*"):
        event = json.loads(client.get(key))
        events.append(event)

    return events


def get_event(event_id: str):
    data = client.get(f"event:{event_id}")

    if data:
        return json.loads(data)

    return None


def update_event(event_id: str, event):
    existing = get_event(event_id)

    if existing is None:
        return None

    updated = event.model_dump()

    updated["id"] = event_id
    updated["created_by"] = existing["created_by"]
    updated["participants"] = existing["participants"]

    client.set(
        f"event:{event_id}",
        json.dumps(updated),
    )

    return updated


def delete_event(event_id: str):
    event = get_event(event_id)

    if event is None:
        return None

    client.delete(f"event:{event_id}")

    return event


def join_event(event_id: str, user_id: str):
    event = get_event(event_id)

    if event is None:
        return None

    if user_id not in event["participants"]:
        event["participants"].append(user_id)

    client.set(
        f"event:{event_id}",
        json.dumps(event),
    )

    return event


def get_my_events(user_id: str):
    events = get_all_events()

    results = []

    for event in events:
        if user_id in event["participants"]:
            results.append(event)

    return results
