from django.db import models
from django.utils import timezone
import uuid
import pytz
from timezone_field import TimeZoneField
from core.models._base_domain import Domain_base


class Battery(Domain_base):
   name= models.CharField(db_column='name', max_length=15, blank=False, unique=True)
   operated= models.BooleanField(db_column='operated',default=True)
   active= models.BooleanField(db_column='active',blank=False, default=True)
   latitude= models.TextField(db_column='latitude', max_length=15, blank=True, null=True)
   longitude= models.TextField(db_column='longitude',  max_length=15, blank=True, null=True)
   # time_zone= timezone.now() 
   type= models.ForeignKey('battery_type', on_delete=models.CASCADE, null=True)
   company_id = models.ForeignKey('company', on_delete=models.CASCADE, null=True)   
   day_start= models.DateTimeField(auto_now_add=False, blank=True, null=True)   
   product= models.CharField(db_column='product', max_length=15, blank=True, null= True)
   country= models.CharField(db_column='country', max_length=15, blank=True, null= True)
   county= models.CharField(db_column='county', max_length=15, blank=True, null= True)
   code= models.CharField(db_column='code', max_length=15, blank=True, null= True)
   direct_entry= models.BooleanField(db_column='direct_entry',default=False)
   accounting_id= models.CharField(db_column='accounting_id', max_length=15, blank=True, null= True)
   fdc_id= models.CharField(db_column='fdc_id', max_length=15, blank=True, null= True)
   registry_id= models.CharField(db_column='registry_id', max_length=15, blank=True, null= True)
   
   def __str__(self):
      if self.name:
         return self.name
      if self.product:
         return self.product
      if self.country:
         return self.country
      if self.accounting_id:
         return self.accounting_id
      if self.registry_id:
         return self.registry_id

class Meta:
      db_table = 'battery'
      ordering = ["name"]
      verbose_name = "battery"
      verbose_name_plural = "batteries"