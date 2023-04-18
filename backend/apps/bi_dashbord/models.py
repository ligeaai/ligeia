from django.db import models
from django.utils import timezone
from apps.widgets.models import Widget
from apps.item.models import item


class Dashboard(models.Model):
    NAME = models.CharField(max_length=1000)
    WIDGETS = models.ManyToManyField(
        Widget, related_name="widgets", null=True, blank=True
    )
    CULTURE = models.CharField(
        max_length=10,
        null=False,
        db_index=True,
    )
    LAYER_NAME = models.CharField(
        max_length=50,
        null=False,
    )
    ITEM_ID = models.ForeignKey(item, on_delete=models.CASCADE, null=True)
    ROW_ID = models.CharField(max_length=32, null=True, default="*****")
