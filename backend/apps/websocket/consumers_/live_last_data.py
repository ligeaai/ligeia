import threading
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import json
import time
import redis
from asgiref.sync import sync_to_async, async_to_sync
from utils.consumer_utils import find_tag, retive_last_data


class WSConsumeOnlyLastData(AsyncWebsocketConsumer):
    async def send_messages(self):
        old_data = ""
        while self.is_active:
            qs = retive_last_data(**self.kwargs)
            if qs != old_data:
                await (self.send)(json.dumps(qs, ensure_ascii=False))
                old_data = qs
            await asyncio.sleep(5)

    async def connect(self):
        await self.accept()
        self.rds = redis.StrictRedis("redis-test1", port=6379)
        self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
        self.is_active = True
        tag_name, asset = await sync_to_async(find_tag)(self.tag_id)
        self.kwargs = {"tag_name": tag_name, "asset": asset, "redis": self.rds.ts()}
        self.task = asyncio.create_task(self.send_messages())

    async def disconnect(self, close_code):
        try:
            self.is_active = False
            self.task.cancel()
            self.rds.connection_pool.disconnect()
            print("disconnect", close_code)
        except BaseException as e:
            print(e)
