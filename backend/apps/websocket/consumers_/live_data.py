import threading
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import json
import time
import redis
from asgiref.sync import sync_to_async, async_to_sync
from utils.consumer_utils import find_tag, retive_live_data
import os
import environ

env = environ.Env(DEBUG=(bool, False))


class WSLiveConsumer(AsyncWebsocketConsumer):
    async def send_messages(self):
        offset = 0
        while self.is_active:
            query_tuple = retive_live_data(**self.kwargs)
            self.kwargs["start_time"], self.kwargs["end_time"], *data = query_tuple
            if data:
                await self.send(json.dumps(data[0][offset:], ensure_ascii=False))
                offset = len(data[0])
            await asyncio.sleep(2)

    async def connect(self):
        await self.accept()
        redis_host = env("Redis_Db_Name")
        self.rds = redis.StrictRedis(redis_host, port=6379, db=2)
        self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
        self.is_active = True
        tag_name = await sync_to_async(find_tag)(self.tag_id)
        self.kwargs = {"tag_name": tag_name, "redis": self.rds.ts()}
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
