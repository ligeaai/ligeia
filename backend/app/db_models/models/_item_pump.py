from django.db import models
from smart_selects.db_fields import ChainedForeignKey, ChainedManyToManyField
from ._base_equip import Base_equip
# from db_dictionaries.models._uom_set import UOM_Set

from django.forms.models import model_to_dict


class Pump(Base_equip): 
   METRIC_SYSTEM = (
      ('IMPERIAL', 'Imperial'),
      ('METRIC', 'Metric')
    )

   metric_system = models.CharField(db_column='metric_system', max_length=100, blank=True, unique=False, null=True, verbose_name='Metric System', choices = METRIC_SYSTEM)
   density =  models.DecimalField(db_column='density', max_digits=1000, decimal_places=100, null=True, blank=True)
   # density_uom =  models.CharField(db_column='density_uom',max_length=100, blank=True, null=True, verbose_name='Density UOM', choices = choices2)
   # density_uom =  models.ForeignKey('dictionaries.uom_set', db_column='density_uom', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Density UOM')
   temperature =  models.DecimalField(db_column='temperature', max_digits=1000, decimal_places=100, null=True, blank=True)
   # data = models.JSONField()
   # temperature_uom =  models.ForeignKey('dictionaries.uom_set', db_column='temperature_uom', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Temperature UOM')

   # choices = models.CharField(db_column='choices', max_length=100, choices=choices)
   
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
      db_table = 'pump'
      app_label = 'app.db_models'
      ordering = ["name"]
      verbose_name = "pump"
      verbose_name_plural = "pumps"