from django.db import models
from django.utils import timezone
import uuid
from core.models._base_domain import Base_domain


class Base_equip(Base_domain):
   accounting_id = models.CharField(db_column='accounting_id', max_length=15, blank=True, null= True)
   fdc_id = models.CharField(db_column='fdc_id', max_length=15, blank=True, null= True)
   registry_id = models.CharField(db_column='registry_id', max_length=15, blank=True, null= True)
   
   def __str__(self):
      if self.acc_id:
         return self.acc_id
      if self.disp_type:
         return self.disp_type
      if self.fdc_id:
         return self.fdc_id
      if self.fuel_method:
         return self.fuel_method
      if self.number:
         return self.number
      if self.power_source:
         return self.power_source
class Meta:
      db_table = 'base_equip'