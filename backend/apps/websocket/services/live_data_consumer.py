
import threading
from apps.tags.models import tags
from channels.generic.websocket import WebsocketConsumer
from apps.tags.serializers import TagsFieldsSerializer
import redis
import json

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