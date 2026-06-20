import valkey

from app.core.config import (
    VALKEY_HOST,
    VALKEY_PORT,
    VALKEY_DB,
)

client = valkey.Valkey(
    host=VALKEY_HOST,
    port=VALKEY_PORT,
    db=VALKEY_DB,
    decode_responses=True,
)