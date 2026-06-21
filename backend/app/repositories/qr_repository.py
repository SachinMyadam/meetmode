import base64

from app.repositories.user_repository import (
    get_user,
)


def generate_qr(user_id: str):
    qr = base64.b64encode(
        user_id.encode()
    ).decode()

    return {
        "qr_code": qr
    }


def scan_qr(qr_code: str):
    try:
        user_id = base64.b64decode(
            qr_code
        ).decode()

        return get_user(user_id)

    except Exception:
        return None
