from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from app.core.auth import verify_access_token
from app.repositories.user_repository import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login",
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
):
    try:
        payload = verify_access_token(token)

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication credentials",
            )

        user = get_user_by_email(email)

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found",
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
        )
