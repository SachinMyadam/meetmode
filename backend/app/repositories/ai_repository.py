from app.core.breeth import breeth


class AIRepository:

    async def remember(self, content: str, group_id: str = "default"):
        async with await breeth.client() as client:
            return await client.write(
                content=content,
                group_id=group_id,
                source_description="MeetMode",
                extract_intent=True,
            )

    async def search(
        self,
        query: str,
        group_id: str = "default",
        limit: int = 5,
    ):
        async with await breeth.client() as client:
            return await client.retrieve(
                query=query,
                group_id=group_id,
                limit=limit,
            )

    async def groups(self):
        async with await breeth.client() as client:
            return await client.groups()


ai_repository = AIRepository()
