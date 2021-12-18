from django.db import models
from django.utils import timezone
from datetime import datetime
import uuid
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

User = get_user_model()

def end_datetime():
    return datetime.strptime("01/01/9000 00:00:00", "%d/%m/%Y %H:%M:%S")

class Base_domain(models.Model):
    start_datetime = models.DateTimeField(db_column='start_datetime', default=timezone.now, blank=True, verbose_name='Datetime')
    end_datetime = models.DateTimeField(db_column='end_datetime', default=end_datetime, blank=False, verbose_name='End Datetime')
    name = models.CharField(db_column='name', max_length=100, blank=False, unique=True, verbose_name='Name')
    short_name = models.CharField(db_column='short_name', max_length=100, blank=False, unique=True, verbose_name='Short Name')
    active = models.BooleanField(db_column='active', blank=False, default=True, verbose_name='Active')
    operated = models.BooleanField(db_column='operated', default=True, verbose_name='Operated')
    last_updt_user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, editable=True, null=True, verbose_name='Last Update User')
    last_updt_date = models.DateTimeField(auto_now=True, blank=True, editable=True, null=True, verbose_name='Last Update Date')
    row_id = models.UUIDField(db_column='row_id', primary_key=False, default=uuid.uuid4, editable=False, null=True, verbose_name='Row ID')
    create_source = models.CharField(db_column='create_source', default='DJANGO', max_length=100, blank=True, editable=True, null=True, verbose_name='Create Source')
    update_source = models.CharField(db_column='update_source', max_length=100, blank=True, editable=True, null=True, verbose_name='Update Source')
    version = models.CharField(db_column='version', max_length=100, blank=True, editable=True, null=True, verbose_name='Version')
    accounting_id = models.CharField(db_column='accounting_id', max_length=100, blank=True, null=True, verbose_name='Accounting ID')
    serial_id = models.CharField(db_column='serial_id', max_length=100, blank=True, null=True, verbose_name='Serial ID')
    registry_id = models.CharField(db_column='registry_id', max_length=100, blank=True, null=True, verbose_name='Registry ID')

    def __str__(self):
        return f"{self.name}, {self.short_name}"

class Meta:
    verbose_name = _("base_domain")
    verbose_name_plural = _("base_domains")

