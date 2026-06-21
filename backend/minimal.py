import asyncio
import os

import httpx
from dotenv import load_dotenv

from mcp import ClientSession
from mcp.client.streamable_http import streamable_http_client

load_dotenv(".env")


async def main():

    client = httpx.AsyncClient(
        headers={
            "Authorization": f"Bearer {os.getenv('BREETH_API_KEY')}",
        }
    )

    async with streamable_http_client(
        os.getenv("BREETH_BASE_URL"),
        http_client=client,
    ) as (
        read_stream,
        write_stream,
        get_session_id,
    ):

        print("✅ Transport Connected")

        async with ClientSession(
            read_stream,
            write_stream,
        ) as session:

            print("⏳ Initializing...")

            await session.initialize()

            print("✅ Initialized")

            print("Session ID:", get_session_id())

            tools = await session.list_tools()

            print("Tools:")

            print(tools)

    await client.aclose()


asyncio.run(main())
