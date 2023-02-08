import threading
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import json
import time
import redis
from asgiref.sync import sync_to_async,async_to_sync
from utils.consumer_utils import find_tag,retive_live_data,delThread,createThread

class WSLiveConsumer(AsyncWebsocketConsumer):
    
    def send_messages(self,**kwargs):
        while self.is_active:
            query_tuple = tuple()
            query_tuple = retive_live_data(**kwargs)
            kwargs['start_time']=query_tuple[0]
            kwargs['end_time']=query_tuple[1]
            if len(query_tuple) > 2:
                async_to_sync(self.send)(json.dumps(query_tuple[2], ensure_ascii=False))
            asyncio.sleep(5)

    
    async def connect(self):
        await self.accept()
        self.rds = redis.StrictRedis("redis-test1", port=6379)
        self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
        self.is_active = True
        tag_name,asset = await sync_to_async(find_tag)(self.tag_id)
        self.kwargs = {
            "tag_name":tag_name,
            "asset":asset,
            "redis":self.rds.ts()}
        self.thread = createThread(self.send_messages,self.kwargs)
    
    async def receive(self, text_data):
        try:
            self.is_active = False
            delThread(self.thread)
            self.kwargs["start_time"]= str(text_data.split(",")[0])
            self.kwargs["end_time"]= str(text_data.split(",")[1])
            self.thread = createThread(self.send_messages,self.kwargs)
        except:
            pass
        
    async def disconnect(self, close_code):
        try:
            self.is_active = False
            delThread(self.thread)
            self.rds.connection_pool.disconnect()
            print("disconnect", close_code)
        except BaseException as e:
            print(e)