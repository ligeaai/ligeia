from django.db import models
from django.utils import timezone
import uuid
import pytz
from timezone_field import TimeZoneField
from dbmodels.models._base_domain import Base_domain


class Battery(Base_domain):
   latitude= models.CharField(db_column='latitude', max_length=15, blank=True, null=True)
   longitude= models.CharField(db_column='longitude',  max_length=15, blank=True, null=True)
   # time_zone= timezone.now() 
   type= models.ForeignKey('type_battery', on_delete=models.CASCADE, blank=True, null=True)
   day_start= models.DateTimeField(auto_now_add=False, blank=True, null=True)   
   product= models.ForeignKey('type_product', on_delete=models.CASCADE, blank=True, null=True)
   # company_id = models.ForeignKey('company', on_delete=models.CASCADE, null=True)
   field_ref = models.ForeignKey('field', on_delete=models.CASCADE, null=True)
   code = models.CharField(db_column='code', max_length=15, blank=True, null= True)
   direct_entry = models.BooleanField(db_column='direct_entry',default=False)
   scada = models.BooleanField(db_column='SCADA',default=True)
   accounting_id = models.CharField(db_column='accounting_id', max_length=15, blank=True, null= True)
   fdc_id = models.CharField(db_column='fdc_id', max_length=15, blank=True, null= True)
   registry_id = models.CharField(db_column='registry_id', max_length=15, blank=True, null= True)
   
   def __str__(self):
      if self.name:
         return self.name
      if self.type:
         return self.type
      if self.product:
         return self.product
      # if self.country:
      #    return self.country
      # if self.accounting_id:
      #    return self.accounting_id
      # if self.registry_id:
      #    return self.registry_id

class Meta:
      db_table = 'battery'
      ordering = ["name"]
      verbose_name = "battery"
      verbose_name_plural = "batteries"