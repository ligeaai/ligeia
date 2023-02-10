import threading
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import json
import time
import redis
from asgiref.sync import sync_to_async, async_to_sync
from utils.consumer_utils import find_tag, retive_live_data


class WSLiveConsumer(AsyncWebsocketConsumer):
    async def send_messages(self):
        while self.is_active:
            query_tuple = retive_live_data(**self.kwargs)
            self.kwargs["start_time"], self.kwargs["end_time"], *data = query_tuple
            if data:
                await self.send(json.dumps(data[0], ensure_ascii=False))
            await asyncio.sleep(5)

    async def connect(self):
        await self.accept()
        self.rds = redis.StrictRedis("redis-test1", port=6379)
        self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
        self.is_active = True
        tag_name, asset = await sync_to_async(find_tag)(self.tag_id)
        self.kwargs = {"tag_name": tag_name, "asset": asset, "redis": self.rds.ts()}
        self.task = asyncio.create_task(self.send_messages())

    async def receive(self, text_data):
        try:
            start_time, end_time = text_data.split(",")
            self.kwargs["start_time"] = start_time
            self.kwargs["end_time"] = end_time
        except:
            pass

    async def disconnect(self, close_code):
        try:
            self.is_active = False
            self.task.cancel()
            self.rds.connection_pool.disconnect()
            print("disconnect", close_code)
        except BaseException as e:
            print(e)
