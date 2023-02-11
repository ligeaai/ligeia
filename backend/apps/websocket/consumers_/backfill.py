from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import json
from pymongo import MongoClient, DESCENDING
from asgiref.sync import sync_to_async, async_to_sync
from utils.consumer_utils import find_tag, retrieve_backfill_data


class WSConsumerBackfill(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.client = MongoClient("mongodb://root:admin@mongodb-timescale:27017/")
        self.mongo_db = self.client["backfilldata3"]
        self.collection = self.mongo_db["backfilldata3"]
        self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
        self.tag_name, self.asset = await sync_to_async(find_tag)(self.tag_id)
        self.kwargs = {
            "query": {
                "$and": [
                    {"tag_name": self.tag_name},
                    {"asset": self.asset},
                ]
            },
            "collection": self.collection,
        }
        qs = await sync_to_async(retrieve_backfill_data)(**self.kwargs)
        await self.send(json.dumps(qs, ensure_ascii=False))

    async def receive(self, text_data):
        try:
            start_date, end_date = text_data.split(",")
            query = {
                "$and": [
                    {"tag_name": self.tag_name},
                    {"asset": self.asset},
                    {"date": {"$gte": start_date}},
                    {"date": {"$lte": end_date}},
                ]
            }
            self.kwargs["query"] = query
            qs = await sync_to_async(retrieve_backfill_data)(**self.kwargs)
            await self.send(json.dumps(qs, ensure_ascii=False))
        except BaseException as e:
            print(e)

    async def disconnect(self, close_code):
        try:
            self.client.close()
            print("disconnect", close_code)
        except BaseException as e:
            print(e)
