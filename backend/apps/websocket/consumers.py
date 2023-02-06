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

env = environ.Env(DEBUG=(bool, False))


def retrieve_data(self, start="-", end="+", tag_id=""):
    tag = tags.objects.filter(TAG_ID=tag_id)
    if tag:
        serializer = TagsFieldsSerializer(tag, many=True).data[0]
        tag_name = str(serializer.get("NAME").split(".")[1])
        asset = str(serializer.get("NAME").split(".")[0])
        while self.is_active:
            data = self.rds.ts().mrange(
                start,
                end,
                ["tag_name=" + tag_name, "asset=" + asset],
                with_labels=True,
                empty=True,
            )
            try:
                start = (list(data[-1].values())[0][1][0][0]) + 1
                self.send(json.dumps(data, ensure_ascii=False))
            except:
                pass
    else:
        raise BaseException("error")


class WSLiveConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        try:
            self.rds = redis.StrictRedis("redis-test1", port=6379)
            self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
            self.is_active = True
            self.thread = threading.Thread(
                target=retrieve_data, kwargs={"self": self, "tag_id": self.tag_id}
            )
            self.thread.start()

        except Exception as e:
            print(e)

    def receive(self, text_data):
        try:
            # I delete the previous thread in every message because filtering the old data while new data is coming in may break the order
            self.is_active = False
            self.thread.join()
            del self.thread
            self.is_active = True
            self.thread = threading.Thread(
                target=retrieve_data,
                kwargs={
                    "self": self,
                    "tag_id": self.tag_id,
                    "start": text_data.split(",")[0],
                    "end": text_data.split(",")[1],
                },
            )
            self.thread.start()
        except Exception as e:
            raise BaseException(e)

    def disconnect(self, close_code):
        try:
            self.is_active = False
            self.thread.join()
            self.rds.connection_pool.disconnect()
            del self.thread
            print("disconnect", close_code)
        except BaseException as e:
            print(e)


class AlarmsConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        rds = redis.StrictRedis(env("REDIS_HOST"), port=6379, db=2)
        for i in rds.keys():
            data = rds.get(i)
            data = data.decode("utf-8")
            data = json.loads(data)
            if data.get("LOG_TYPE") == "ALARMS":
                print(data)
                # item LAYER match tag_naame
                self.send(json.dumps({"message": data}))

    def disconnect(self, close_code):
        print("disconnect")

    def receive(self, text_data):
        rds = redis.StrictRedis(env("REDIS_HOST"), port=6379, db=2)
        for i in rds.keys():
            data = rds.get(i)
            data = data.decode("utf-8")
            data = json.loads(data)
            if data.get("LOG_TYPE") == "ALARMS":
                if data.get("CONTENTS").get("quality") > int(
                    text_data
                ):  # item LAYER match tag_naame
                    self.send(json.dumps({"message": data.get("CONTENTS")}))



def retrieve_last_data(self, tag_id):
    tag = tags.objects.filter(TAG_ID=tag_id)
    if tag:
        serializer = TagsFieldsSerializer(tag, many=True).data[0]
        old_data = ""
        while self.is_activeLastData:
            data = self.rds.ts().mget(
                [
                    "tag_name=" + str(serializer.get("NAME").split(".")[1]),
                    "asset=" + str(serializer.get("NAME").split(".")[0]),
                ],
                with_labels=True,
                latest=False,
            )
            self.send(json.dumps(data[-1], ensure_ascii=False)) if data[
                -1
            ] != old_data else old_data
            old_data = data[-1]
    else:
        raise BaseException("error")


class WSConsumeOnlyLastData(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.is_activeLastData = True
        self.rds = redis.StrictRedis("redis-test1", port=6379, db=2)
        self.tag_id = self.scope["url_route"]["kwargs"]["tag_id"]
        self.thread = threading.Thread(
            target=retrieve_last_data, kwargs={"self": self, "tag_id": self.tag_id}
        )
        self.thread.start()

    def disconnect(self, close_code):
        try:
            self.is_activeLastData = False
            self.thread.join()
            self.rds.connection_pool.disconnect()
            del self.thread
            print("disconnect", close_code)
        except BaseException as e:
            print(e)


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
