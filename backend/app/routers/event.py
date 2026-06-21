from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_current_user
from app.schemas.event import EventCreate, EventUpdate
from app.services.event_service import (
    create_new_event,
    fetch_all_events,
    fetch_event,
    update_existing_event,
    delete_existing_event,
    join_existing_event,
    fetch_my_events,
)

router = APIRouter(
    prefix="/events",
    tags=["Events"],
)


@router.post("")
def create_event(
    event: EventCreate,
    current_user=Depends(get_current_user),
):
    return create_new_event(
        event,
        current_user["id"],
    )


@router.get("")
def get_events():
    return fetch_all_events()


@router.get("/{event_id}")
def get_single_event(event_id: str):
    event = fetch_event(event_id)

    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found",
        )

    return event


@router.put("/{event_id}")
def update_event(
    event_id: str,
    event: EventUpdate,
):
    updated = update_existing_event(
        event_id,
        event,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found",
        )

    return updated


@router.delete("/{event_id}")
def delete_event(event_id: str):
    deleted = delete_existing_event(
        event_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found",
        )

    return deleted


@router.post("/{event_id}/join")
def join_event(
    event_id: str,
    current_user=Depends(get_current_user),
):
    joined = join_existing_event(
        event_id,
        current_user["id"],
    )

    if joined is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found",
        )

    return joined


@router.get("/my/events")
def my_events(
    current_user=Depends(get_current_user),
):
    return fetch_my_events(
        current_user["id"],
    )
