import threading
import json
from channels.generic.websocket import WebsocketConsumer
from pymongo import MongoClient, DESCENDING
from apps.tags.models import tags
from apps.tags.serializers import TagsFieldsSerializer


class WSConsumerBackfill(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.client = MongoClient("mongodb://root:admin@mongodb-timescale:27017/")
        self.mongo_db = self.client["backfilldata3"]
        self.timeseries_collection = self.mongo_db["backfilldata3"]
        self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
        tag = tags.objects.filter(TAG_ID=self.tag_id).first()
        if tag:
            self.serializer = TagsFieldsSerializer(tag).data
            self.thread = threading.Thread(target=self.retrieve_backfill_data)
            self.thread.start()

    def receive(self, text_data):
        start_date, end_date = text_data.split(",")
        data = list(
            self.collection.find(
                {
                    "$and": [
                        {"tag_name": self.serializer.get("NAME").split(".")[1]},
                        {"asset": self.serializer.get("NAME").split(".")[0]},
                        {"date": {"$gte": start_date}},
                        {"date": {"$lte": end_date}},
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
        print("Disconnected")

    def retrieve_backfill_data(self):
        query = {
            "tag_name": self.serializer.get("NAME").split(".")[1],
            "asset": self.serializer.get("NAME").split(".")[0],
        }
        data = list(self.collection.find(query, {"_id": 0}))
        self.send(json.dumps(data, ensure_ascii=False))
