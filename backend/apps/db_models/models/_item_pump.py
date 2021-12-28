from django.db import models
from django.utils.translation import gettext_lazy as _
from ._base_equip import Base_equip


class Pump(Base_equip):
    METRIC_SYSTEM = [('IMPERIAL', 'Imperial'), ('METRIC', 'Metric')]

    metric_system = models.CharField(db_column='metric_system',
                                     max_length=100,
                                     blank=True,
                                     unique=False,
                                     null=True,
                                     verbose_name='Metric System',
                                     choices=METRIC_SYSTEM)
    density = models.DecimalField(db_column='density',
                                  max_digits=1000,
                                  decimal_places=100,
                                  null=True,
                                  blank=True)
    # density_uom =  models.CharField(db_column='density_uom',max_length=100, blank=True, null=True, verbose_name='Density UOM', choices = choices2)
    # density_uom =  models.ForeignKey('dictionaries.uom_set', db_column='density_uom', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Density UOM')
    temperature = models.DecimalField(db_column='temperature',
                                      max_digits=1000,
                                      decimal_places=100,
                                      null=True,
                                      blank=True)

    def __str__(self):
        if self.name:
            return self.name
        elif self.short_name:
            return self.short_name
        elif self.product:
            return self.product
        elif self.type:
            return self.type
        elif self.satus:
            return self.status

    class Meta:
        # ordering = ["name"]
        verbose_name = _("pump")
        verbose_name_plural = _("pumps")
