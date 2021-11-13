from django.db import models
from django.utils import timezone
import uuid
from dbmodels.models._base_domain import Base_domain


class Base_equip(Base_domain):
   accounting_id = models.CharField(db_column='accounting_id', max_length=15, blank=True, null= True)
   serial_id = models.CharField(db_column='serial_id', max_length=15, blank=True, null= True)
   registry_id = models.CharField(db_column='registry_id', max_length=15, blank=True, null= True)
   
   def __str__(self):
      if self.accounting_id:
         return self.accounting_id
      if self.serial_id:
         return self.serial_id
      if self.registry_id:
         return self.registry_id
class Meta:
      db_table = 'base_equip'