from django.db import models
from django.utils import timezone
import uuid
from db_models.models._base_domain import Base_domain


class Base_equip(Base_domain):
   latitude= models.CharField(db_column='latitude', max_length=100, blank=True, null=True, verbose_name='Latitude')
   longitude= models.CharField(db_column='longitude',  max_length=100, blank=True, null=True, verbose_name='Longitude')
   
   battery_ref = models.ForeignKey('battery', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Battery Ref.')
   # product= models.ForeignKey('dictionaries.type_battery', on_delete=models.CASCADE, blank=True, null=True)
   # type= models.ForeignKey('dictionaries.type_pump', on_delete=models.CASCADE, blank=True, null=True)
   # status= models.ForeignKey('dictionaries.type_status', on_delete=models.CASCADE, blank=True, null=True)
   
   code = models.CharField(db_column='code', max_length=100, blank=True, null= True, verbose_name='Code')
   direct_entry = models.BooleanField(db_column='direct_entry',default=False, verbose_name='Manual')
   scada = models.BooleanField(db_column='SCADA',default=True, verbose_name='SCADA')
   
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
      db_table = 'base_equip'
      app_label = 'db_models'
      ordering = ["name"]
      # verbose_name = "base_equip"
      # verbose_name_plural = "base_equips"