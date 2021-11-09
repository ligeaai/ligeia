from django.db import models
import uuid
from cities_light.models import City, Region, Country
from cities_light.models import Region
from smart_selects.db_fields import ChainedForeignKey
from core.models._base_domain import Base_domain

class Company(Base_domain):
   company_ref = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
   country = models.ForeignKey(Country, on_delete=models.CASCADE, blank=True)
   region = ChainedForeignKey(Region, chained_field="country", chained_model_field="country", show_all=False, auto_choose=True, sort=True, blank=True)
   city = ChainedForeignKey(City, chained_field="region", chained_model_field="region", show_all=False, auto_choose=True, sort=True, blank=True)
   contact_name = models.CharField(db_column='contact_name', max_length=15, blank=True, null=True)   
   address = models.CharField(db_column='address', max_length=30, blank=True, null=True)
   email = models.CharField(db_column='email', max_length=15, blank=True, null=True)
   phone = models.CharField(db_column='phone', max_length=15, blank=True, null=True)
   operator = models.BooleanField(db_column='operator', blank=True, default=True)
   owner = models.BooleanField(db_column='owner', blank=True, default=True)
   purchaser = models.BooleanField(db_column='purchaser', blank=True, default=True)
   transporter = models.BooleanField(db_column='transporter', blank=True, default=True)
   
   def __str__(self):
      if self.name:
         return self.name

class Meta:
      db_table = 'company'
      ordering = ["name"]
      verbose_name = "company"
      verbose_name_plural = "companies"