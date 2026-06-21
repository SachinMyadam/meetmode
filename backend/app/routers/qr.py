from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_current_user
from app.schemas.qr import QRScanRequest
from app.services.qr_service import (
    create_qr,
    scan_user_qr,
)
from app.services.user_service import fetch_user_by_email

router = APIRouter(
    prefix="/qr",
    tags=["QR"],
)


@router.get("/generate")
def generate_my_qr(
    email: str = Depends(get_current_user),
):
    user = fetch_user_by_email(email)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return create_qr(user["id"])


@router.post("/scan")
def scan_qr_code(
    request: QRScanRequest,
):
    user = scan_user_qr(
        request.qr_code,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Invalid QR Code",
        )

    return user
