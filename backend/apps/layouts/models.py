from django.db import models
from apps.widgets.models import Widget


class Layout(models.Model):
    static = models.BooleanField(default=False)
    w = models.IntegerField()
    moved = models.BooleanField(default=True)
    h = models.IntegerField()
    x = models.IntegerField()
    y = models.IntegerField()
    l_type = models.CharField(max_length=10)
    i = models.ForeignKey(Widget, on_delete=models.CASCADE, related_name="layouts")
    ROW_ID = models.CharField(max_length=1000, null=True, default="*****")
