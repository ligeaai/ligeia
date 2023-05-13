from apps.tags.models import tags
from apps.tags.serializers import TagsFieldsSerializer
import threading


def find_tag(tag_id):
    tag = tags.objects.filter(TAG_ID=tag_id)
    if tag:
        serializer = TagsFieldsSerializer(tag, many=True).data[0]
        # asset, tag_name = serializer.get("NAME").split(".")
        # return tag_name, asset
        return serializer.get("NAME")
    else:
        raise BaseException("Tags not found")


def retive_live_data(start_time="-", end_time="+", tag_name="", asset="", redis=""):
    data = redis.mrange(
        start_time,
        end_time,
        ["tag_name=" + tag_name],
        with_labels=True,
        empty=True,
    )
    try:
        start_time = (list(data[-1].values())[0][1][0][0]) + 1

        return start_time, end_time, data
    except:
        return start_time, end_time


def retive_last_data(tag_name="", asset="", redis=""):
    query = ["tag_name=" + tag_name]
    data = redis.mget(query, with_labels=True, latest=False)
    return data[-1]


def retrieve_backfill_data(collection, query):
    data = list(collection.find(query, {"_id": 0}))
    return data


def createThread(function):
    thread = threading.Thread(target=function)
    thread.start()
    return thread


def delThread(thread):
    # I delete the previous thread in every message because filtering
    # the old data while new data is coming in may break the order
    thread.join()
    del thread
