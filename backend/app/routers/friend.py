from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_current_user
from app.services.friend_service import (
    send_request,
    fetch_pending_requests,
    accept_request,
    reject_request,
    fetch_connections,
)

router = APIRouter(
    prefix="/friends",
    tags=["Friends"],
)


@router.post("/request")
def create_friend_request(
    receiver_id: str,
    current_user=Depends(get_current_user),
):
    return send_request(
        current_user["id"],
        receiver_id,
    )


@router.get("/pending")
def pending_requests(
    current_user=Depends(get_current_user),
):
    return fetch_pending_requests(
        current_user["id"],
    )


@router.put("/{request_id}/accept")
def accept_friend_request(
    request_id: str,
    current_user=Depends(get_current_user),
):
    request = accept_request(request_id)

    if request is None:
        raise HTTPException(
            status_code=404,
            detail="Friend request not found",
        )

    return request


@router.put("/{request_id}/reject")
def reject_friend_request(
    request_id: str,
    current_user=Depends(get_current_user),
):
    request = reject_request(request_id)

    if request is None:
        raise HTTPException(
            status_code=404,
            detail="Friend request not found",
        )

    return request


@router.get("/connections")
def connections(
    current_user=Depends(get_current_user),
):
    return fetch_connections(
        current_user["id"],
    )
