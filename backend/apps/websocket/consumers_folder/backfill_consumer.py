import threading
import json
import environ
from channels.generic.websocket import WebsocketConsumer
import redis
from pymongo import MongoClient, DESCENDING
import time
from threading import Thread
from apps.tags.models import tags
from apps.tags.serializers import TagsFieldsSerializer


def retrieve_backfill_data(self, tag_id):
    tag = tags.objects.filter(TAG_ID=self.tag_id)
    if tag:
        self.serializer = TagsFieldsSerializer(tag, many=True).data[0]
        data = list(
            self.timeseries_collection.find(
                {
                    "tag_name": self.serializer.get("NAME").split(".")[1],
                    "asset": self.serializer.get("NAME").split(".")[0],
                },
                {"_id": 0},
            )
        )
        self.send(json.dumps(data, ensure_ascii=False))


class WSConsumerBackfill(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.client = MongoClient("mongodb://root:admin@mongodb-timescale:27017/")
        self.mongo_db = self.client["backfilldata3"]
        self.timeseries_collection = self.mongo_db["backfilldata3"]
        self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
        self.thread = threading.Thread(
            target=retrieve_backfill_data, kwargs={"self": self, "tag_id": self.tag_id}
        )
        self.thread.start()

    def receive(self, text_data):
        # timestampt string olarak kaydedilmiş küçük büyük kontrolü yapamıyorum
        data = list(
            self.timeseries_collection.find(
                {
                    "$and": [
                        {"tag_name": self.serializer.get("NAME").split(".")[1]},
                        {"asset": self.serializer.get("NAME").split(".")[0]},
                        {"date": {"$gte": (str(text_data).split(",")[0])}},
                        {"date": {"$lte": (str(text_data).split(",")[1])}},
                    ]
                },
                {"_id": 0},
            )
        )
        self.send(json.dumps(data, ensure_ascii=False))

    def disconnect(self, close_code):
        self.client.close()
        self.thread.join()
        del self.thread
        print("disconnect")