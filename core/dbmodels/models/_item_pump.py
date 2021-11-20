from django.db import models
import uuid
from smart_selects.db_fields import ChainedForeignKey, ChainedManyToManyField
from dbmodels.models._base_equip import Base_equip
# from dbmodels.models._uom_base import UOM_Base
from dbmodels.models._uom_set import UOM_Set

class Pump(Base_equip): 
   METRIC_SYSTEM = (
      ('IMPERIAL', 'Imperial'),
      ('METRIC', 'Metric')
    )

   metric_system = models.CharField(db_column='metric_system', max_length=100, blank=True, unique=False, null=True, verbose_name='Metric System', choices = METRIC_SYSTEM)
   density =  models.DecimalField(db_column='density', max_digits=1000, decimal_places=100, null=True, blank=True)
   density_uom =  models.ForeignKey('uom_set', db_column='density_uom', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Density UOM')
   temperature =  models.DecimalField(db_column='temperature', max_digits=1000, decimal_places=100, null=True, blank=True)
   # temperature_uom =  models.ForeignKey('uom_set', db_column='temperature_uom', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Temperature UOM')

   
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
      ordering = ["name"]
      verbose_name = "pump"
      verbose_name_plural = "pumps"