from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_current_user
from app.schemas.qr import QRScanRequest
from app.services.qr_service import create_qr, scan_user_qr

router = APIRouter(
    prefix="/qr",
    tags=["QR"],
)


@router.get("/generate")
def generate_my_qr(
    current_user=Depends(get_current_user),
):
    return create_qr(current_user["id"])


@router.post("/scan")
def scan_qr_code(
    request: QRScanRequest,
):
    user = scan_user_qr(request.qr_code)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Invalid QR Code",
        )

    return user
