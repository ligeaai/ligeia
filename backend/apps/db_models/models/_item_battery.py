from django.db import models
from django.utils.translation import gettext_lazy as _
from ._base_domain import Base_domain

class Battery(Base_domain):
    latitude = models.CharField(
        verbose_name=_("Latitude"),
        max_length=100,
        blank=True,
        null=True
    )
    longitude = models.CharField(
        verbose_name=_("Longitude"),
        max_length=100,
        blank=True,
        null=True
    )
    type = models.CharField(
        verbose_name=_("Type"),
        max_length=100,
        blank=True, 
        null=True
    )
    product = models.CharField(
        verbose_name=_("Product"),
        max_length=100,
        blank=True,
        null=True   
    )
    day_start = models.DateTimeField(
        verbose_name=_("Prod. Start"),
        auto_now_add=False, 
        blank=True, 
        null=True,         
    )
    company_ref = models.ForeignKey(
        "company",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name=_("Company Ref.")
    )
    battery_ref = models.ForeignKey(
        "battery",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name=_("Battery Ref.")
    )
    field_ref = models.ForeignKey(
        "field",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name=_("Field Ref.")
    )
    code = models.CharField(
        verbose_name=_("Code"),
        max_length=100, 
        blank=True, 
        null=True,         
    )
    direct_entry = models.BooleanField(
        verbose_name=_("Direct Entry"),
        default=False,         
    )
    scada = models.BooleanField(
        verbose_name=_("SCADA"),
        default=True,         
    )

    def __str__(self):
        if self.name:
            return self.name
        elif self.type:
            return self.type
        elif self.product:
            return self.product
        elif self.accounting_id:
            return self.accounting_id
        elif self.serial_id:
            return self.serial_id
        elif self.registry_id:
            return self.registry_id

    class Meta:
        ordering = ["name"]
        verbose_name = _("battery")
        verbose_name_plural = _("batteries")
