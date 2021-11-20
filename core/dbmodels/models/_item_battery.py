from django.db import models

import uuid
import pytz
from timezone_field import TimeZoneField
from dbmodels.models._base_domain import Base_domain


class Battery(Base_domain):
   latitude= models.CharField(db_column='latitude', max_length=100, blank=True, null=True, verbose_name='Latitude')
   longitude= models.CharField(db_column='longitude',  max_length=100, blank=True, null=True, verbose_name='Longitude')
   
   type= models.ForeignKey('type_battery', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Type')
   product= models.ForeignKey('type_product', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Product')
   day_start= models.DateTimeField(auto_now_add=False, blank=True, null=True, verbose_name='Prod. Start')      
   
   company_ref = models.ForeignKey('company', on_delete=models.CASCADE, null=True, blank=True, verbose_name='Company Ref.')
   battery_ref = models.ForeignKey('battery', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Battery Ref.')
   field_ref = models.ForeignKey('field', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Field Ref.')
   code = models.CharField(db_column='code', max_length=100, blank=True, null= True, verbose_name='Code')
   direct_entry = models.BooleanField(db_column='direct_entry',default=False, verbose_name='Manual')
   scada = models.BooleanField(db_column='SCADA',default=True, verbose_name='SCADA')

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
      db_table = 'battery'
      ordering = ["name"]
      verbose_name = "battery"
      verbose_name_plural = "batteries"