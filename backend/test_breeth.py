import asyncio
from dotenv import load_dotenv
from breeth import AsyncBreethClient

load_dotenv(".env")

async def main():
    async with AsyncBreethClient() as client:
        result = await client.retrieve(
            query="What does Sachin like?",
            group_id="default",
            limit=5,
        )

        print(result.model_dump())

asyncio.run(main())
