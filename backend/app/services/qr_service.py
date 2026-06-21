from app.repositories.qr_repository import (
    generate_qr,
    scan_qr,
)


def create_qr(user_id: str):
    return generate_qr(user_id)


def scan_user_qr(qr_code: str):
    return scan_qr(qr_code)
