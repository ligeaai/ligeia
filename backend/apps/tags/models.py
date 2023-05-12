from django.db import models
import uuid
from django.utils import timezone
from utils.utils import redisCaching as red
import redis
import environ
from apps.item_link.serializers import ItemLinkSaveSerializer
from utils.models_utils import validate_model_not_null
import json

env = environ.Env(DEBUG=(bool, False))
rds = redis.StrictRedis(env("REDIS_HOST"), port=6379, db=0)
from django.db.utils import IntegrityError


class TagsQuerySet(models.QuerySet):
    def getRedis(self):
        data = rds.lrange("importTag", 0, -1)
        return data

    def updateLog(self, old_log, new_log):
        if old_log:
            # print(old_log)
            old_log = old_log[1]
            old_log = json.loads(old_log)
            for item in new_log:
                old_log.append(item)
        else:
            old_log = new_log
        return old_log

    def updatePercent(self):
        i = self.index / self.chunk_size

        percent = (self.index / self.max_length) * 100
        if i != self.total:
            percent = 100

        return percent

    def updateRedis(self, messages):
        old_logs = self.getRedis()
        new_log = self.updateLog(old_logs, messages)
        new_percent = self.updatePercent()
        data = [[new_log], new_percent]
        rds.delete("importTag")
        new_log = json.dumps(new_log)
        rds.lpush("importTag", new_log)
        rds.lpush("importTag", new_percent)

    def bulk_create(self, objs, batch_size=None, ignore_conflicts=False):
        new_objs = []
        self.max_length, self.index, self.chunk_size, self.total = objs[-1]
        objs = objs[:-1]
        messages = self.myFuns(objs, batch_size, ignore_conflicts)
        self.updateRedis(messages)
        return objs

    def myFuns(self, objs, batch_size, ignore_conflicts):
        messages = []
        error_objs = []
        try:
            super().bulk_create(objs, batch_size=batch_size, ignore_conflicts=False)
            for obj in objs:
                self.saveLink(obj)
                message = obj.NAME + " eklendi"
                messages.append(message)
                # red.lpush('importTag', message)
        except IntegrityError as e:
            for obj in objs:
                try:
                    obj.save()
                    self.saveLink(obj)
                    message = obj.NAME + " eklendi"
                    messages.append(message)
                    # red.lpush('importTag', message)
                except IntegrityError as e:
                    message = obj.NAME + " Failed"
                    messages.append(message)
                    error_objs.append(obj)
        objs = set(set(objs) - set(error_objs))
        return messages

    def saveLink(self, obj):
        if obj.ITEM_ID is not None:
            link_dict = {
                "LINK_ID": uuid.uuid4().hex,
                "TO_ITEM_ID": obj.ITEM_ID,
                "TO_ITEM_TYPE": obj.TRANSACTION_TYPE,
                "END_DATETIME": "9000-01-01",
                "FROM_ITEM_ID": obj.TAG_ID,
                "FROM_ITEM_TYPE": "TAG_CACHE",
                "LINK_TYPE": "TAG_ITEM",
                "START_DATETIME": obj.START_DATETIME,
                "ROW_ID": uuid.uuid4().hex,
                # "LAST_UPDT_USER":request.user
            }
            # validate_model_not_null(link_dict, "ITEM_LINK", request=request)
            link_serializer = ItemLinkSaveSerializer(data=link_dict)
            link_serializer.is_valid()
            message = link_serializer.save(link_dict)
            # print(message)


class TagsModelManager(models.Manager):
    def get_queryset(self):
        return TagsQuerySet(self.model, using=self._db)


# Create your models here.
class tags(models.Model):
    objects = TagsModelManager()
    ITEM_ID = models.CharField(
        max_length=32,
        null=True,
        db_index=True,
    )
    EVENT_TYPE = models.CharField(
        max_length=14,
        null=False,
    )
    TAG_ID = models.CharField(
        max_length=32, default=uuid.uuid4().hex, null=False, primary_key=True
    )
    START_DATETIME = models.DateField(
        default=timezone.now,
        null=False,
    )
    PARENT_TAG_ID = models.CharField(
        max_length=32,
        null=True,
    )
    NAME = models.CharField(max_length=100, null=True, db_index=True, unique=True)
    DESCRIPTION = models.CharField(
        max_length=1000,
        null=True,
    )
    UOM = models.CharField(
        max_length=100,
        null=True,
    )
    UOM_QUANTITY_TYPE = models.CharField(
        max_length=100,
        null=True,
    )
    UOM_NAME = models.CharField(
        max_length=100,
        null=True,
    )
    SHORT_NAME = models.CharField(
        max_length=100,
        null=True,
    )
    DATA_TYPE = models.CharField(
        max_length=100,
        null=True,
    )
    DERIVE_EQUATION = models.CharField(
        max_length=1000,
        null=True,
    )
    EXCEPTION_DEV = models.CharField(
        max_length=1000,
        null=True,
    )
    EXCEPTION_DEV_TYPE = models.CharField(
        max_length=1000,
        null=True,
    )
    NODE_NAME = models.CharField(
        max_length=100,
        null=True,
    )
    PROCESS_NAME = models.CharField(
        max_length=100,
        null=True,
    )
    SOURCE_NAME = models.CharField(
        max_length=100,
        null=True,
    )
    STEPPED = models.CharField(
        max_length=100,
        null=True,
    )
    DATA_ACCESS_TYPE = models.CharField(
        max_length=200,
        null=True,
    )
    LAYER_NAME = models.CharField(
        max_length=50,
        null=False,
    )
    NODE_DUMP = models.CharField(
        max_length=2000,
        null=True,
    )
    NORMAL_MAXIMUM = models.DecimalField(max_digits=28, decimal_places=12, null=True)
    NORMAL_MINIMUM = models.DecimalField(max_digits=28, decimal_places=12, null=True)
    LIMIT_LOLO = models.DecimalField(max_digits=28, decimal_places=12, null=True)
    LIMIT_HIHI = models.DecimalField(max_digits=28, decimal_places=12, null=True)
    EVENT_NOTIFIER = models.DecimalField(max_digits=28, decimal_places=12, null=True)
    NODE_CLASS = models.CharField(
        max_length=20,
        null=True,
    )
    HISTORIZING = models.CharField(
        max_length=10,
        null=True,
    )
    MINIMUM_SAMPLING_INTERVAL = models.DecimalField(
        max_digits=28, decimal_places=12, null=True
    )
    PERIOD = models.CharField(
        max_length=20,
        null=True,
    )
    END_DATETIME = models.DateField(
        default="9000-01-01",
        null=False,
    )
    LAST_UPDATE_USER = models.CharField(
        max_length=100,
        null=True,
    )
    LAST_UPDATE_DATE = models.DateField(
        default=timezone.now,
        null=False,
    )
    VERSION = models.CharField(
        max_length=32,
        null=True,
    )
    DB_ID = models.CharField(
        max_length=32,
        null=True,
    )
    ROW_ID = models.CharField(
        max_length=32,
        null=True,
        db_index=True,
    )
    STATUS = models.CharField(
        max_length=10,
        null=True,
    )
    REV_GRP_ID = models.CharField(
        max_length=32,
        null=True,
    )
    TRANSACTION_TYPE = models.CharField(
        max_length=2000,
        null=True,
    )
    TRANSACTION_PROPERTY = models.CharField(
        max_length=2000,
        null=True,
    )
    UPDATE_SOURCE = models.CharField(
        max_length=100,
        default="x",
        null=True,
    )
    CREATE_SOURCE = models.CharField(
        max_length=100,
        default="x",
        null=True,
    )
