from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import json
from pymongo import MongoClient, DESCENDING
from asgiref.sync import sync_to_async, async_to_sync
from utils.consumer_utils import find_tag, retrieve_backfill_data
import os

class AlarmsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        mongo_client = os.environ("Mongo_Client")
        mongodb_name = os.environ("MongoDb_alarms_Name")
        self.client = MongoClient(mongo_client)
        self.mongo_db = self.client[mongodb_name]
        self.collection = self.mongo_db[mongodb_name]
        self.layer_name = self.scope["url_route"]["kwargs"]["layer_name"]
        self.kwargs = {
            "query": {
                "$and": [
                    {"layer_name": self.layer_name},
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
                    {"layer_name": self.layer_name},
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
