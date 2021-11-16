from django.db import models
from django.utils import timezone
import uuid
from dbmodels.models._base_domain import Base_domain


class Base_equip(Base_domain):
   pass
   
   def __str__(self):
      if self.name:
         return self.name
      if self.accounting_id:
         return self.accounting_id
      if self.serial_id:
         return self.serial_id
      if self.registry_id:
         return self.registry_id
class Meta:
      db_table = 'base_equip'
      ordering = ["name"]
      # verbose_name = "base_equip"
      # verbose_name_plural = "base_equips"