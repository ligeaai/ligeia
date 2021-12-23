from django.db import models
from django.utils.translation import gettext_lazy as _
from ._base_domain import Base_domain


class Base_equip(Base_domain):
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

    battery_ref = models.ForeignKey(
        "battery",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name="Battery Ref.",
    )
    # product= models.ForeignKey('dictionaries.type_battery', on_delete=models.CASCADE, blank=True, null=True)
    # type= models.ForeignKey('dictionaries.type_pump', on_delete=models.CASCADE, blank=True, null=True)
    # status= models.ForeignKey('dictionaries.type_status', on_delete=models.CASCADE, blank=True, null=True)

    code = models.CharField(
        db_column="code", max_length=100, blank=True, null=True, verbose_name="Code"
    )
    direct_entry = models.BooleanField(
        db_column=_("direct_entry"), default=False, verbose_name="Manual"
    )
    scada = models.BooleanField(db_column="SCADA", default=True, verbose_name="SCADA")

    def __str__(self):
        if self.name:
            return self.name
        elif self.short_name:
            return self.short_name
        elif self.product:
            return self.product
        elif self.type:
            return self.type
        elif self.status:
            return self.status
        elif self.accounting_id:
            return self.accounting_id
        elif self.serial_id:
            return self.serial_id
        elif self.registry_id:
            return self.registry_id

    class Meta:
        # asbtract = True
        ordering = ["name"]
        verbose_name = _("base_equip")
        verbose_name_plural = _("base_equips")
