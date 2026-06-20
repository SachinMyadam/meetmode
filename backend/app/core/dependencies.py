from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from app.core.auth import verify_access_token

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

        return email

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
        )