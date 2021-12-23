from django.db import models
from django.utils.translation import gettext_lazy as _
from ._base_domain import Base_domain


class Battery(Base_domain):
    latitude = models.CharField(
        db_column=_("latitude"),
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Latitude",
    )
    longitude = models.CharField(
        db_column=_("longitude"),
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Longitude",
    )

    type = models.CharField(
        db_column=_("type"), max_length=100, blank=True, null=True, verbose_name="Type"
    )
    product = models.CharField(
        db_column=_("product"),
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Product",
    )
    day_start = models.DateTimeField(
        auto_now_add=False, blank=True, null=True, verbose_name="Prod. Start"
    )

    company_ref = models.ForeignKey(
        "company",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Company Ref.",
    )
    battery_ref = models.ForeignKey(
        "battery",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name="Battery Ref.",
    )
    field_ref = models.ForeignKey(
        "field",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name="Field Ref.",
    )
    code = models.CharField(
        db_column=_("code"), max_length=100, blank=True, null=True, verbose_name="Code"
    )
    direct_entry = models.BooleanField(
        db_column=_("direct_entry"), default=False, verbose_name="Manual"
    )
    scada = models.BooleanField(db_column="SCADA", default=True, verbose_name="SCADA")

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
