from django.db import models
from django.utils import timezone
from apps.widgets.models import Widget


class Dashboard(models.Model):
    NAME = models.CharField(max_length=1000)
    WIDGETS = models.ManyToManyField(Widget, related_name="dashboards")
    CULTURE = models.CharField(
        max_length=10,
        null=False,
        db_index=True,
    )
    LAYER_NAME = models.CharField(
        max_length=50,
        null=False,
    )
    ITEM_ID = models.CharField(max_length=32, null=True, default="*****")
    ROW_ID = models.CharField(max_length=32, null=True, default="*****")
