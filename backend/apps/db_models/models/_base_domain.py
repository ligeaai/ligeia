from datetime import datetime
import uuid
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from parler.models import TranslatableModel, TranslatedFields

User = get_user_model()


def end_datetime():
    return datetime.strptime("01/01/9000 00:00:00", "%d/%m/%Y %H:%M:%S")


class Base_domain(models.Model):
    CREATE_SOURCE = [('DJANGO', 'django'), ('WEB', 'web')]
    
    start_datetime = models.DateTimeField(
        verbose_name=_("Start Datetime"),
        default=timezone.now,
        blank=True
    )
    end_datetime = models.DateTimeField(
        verbose_name=_("End Datetime"),
        default=end_datetime,
        blank=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=100,
        blank=False,
        unique=True
    )
    short_name = models.CharField(
        verbose_name=_("Short Name"),
        max_length=100,
        blank=False,
        unique=True
    )
    active = models.BooleanField(
        verbose_name=_("Active"),
        blank=False,
        default=True
    )
    operated = models.BooleanField(
        verbose_name=_("Operated"), 
        default=True
    )
    last_updt_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name=_("Last Update User"),
    )
    last_updt_date = models.DateTimeField(
        verbose_name=_("Last Update Date"),
        auto_now=True,
        blank=True,        
        null=True        
    )
    row_id = models.UUIDField(
        verbose_name=_("Row ID"),
        primary_key=False,
        default=uuid.uuid4,
        editable=False,
        null=True        
    )
    create_source = models.CharField(
        verbose_name=_("Create Source"),
        default="DJANGO",
        max_length=100,
        blank=True,        
        null=True,
        choices=CREATE_SOURCE 
    )
    update_source = models.CharField(
        verbose_name=_("Update Source"),
        max_length=100,
        blank=True,
        null=True,        
    )
    version = models.CharField(
        verbose_name=_("Version"),
        max_length=100,
        blank=True,
        null=True
    )
    accounting_id = models.CharField(
        verbose_name=_("Accounting ID"),
        max_length=100,
        blank=True,
        null=True
    )
    serial_id = models.CharField(
        verbose_name=_("Serial ID"),
        max_length=100,
        blank=True,
        null=True
    )
    registry_id = models.CharField(
        verbose_name=_("Registry ID"),
        max_length=100,
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.name}, {self.short_name}"

    class Meta:
        # asbtract = True
        ordering = ["name"]
        verbose_name = _("base_domain")
        verbose_name_plural = _("base_domains")
