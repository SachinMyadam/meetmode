from pydantic import BaseModel


class QRResponse(BaseModel):
    qr_code: str


class QRScanRequest(BaseModel):
    qr_code: str
