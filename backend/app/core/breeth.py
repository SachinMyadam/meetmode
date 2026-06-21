from dotenv import load_dotenv
from breeth import AsyncBreethClient

load_dotenv(".env")


class BreethClient:
    """
    Official Breeth SDK wrapper.
    """

    async def client(self):
        return AsyncBreethClient()


breeth = BreethClient()
