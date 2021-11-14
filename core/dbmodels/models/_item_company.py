from django.db import models
import uuid
from cities_light.models import City, Region, Country, SubRegion
from cities_light.models import Region
from smart_selects.db_fields import ChainedForeignKey
from dbmodels.models._base_domain import Base_domain

class Company(Base_domain):
   parent = models.ManyToManyField('self', blank=True, symmetrical=False)
   country = models.ForeignKey(Country, on_delete=models.CASCADE, blank=True, null=True)
   region = ChainedForeignKey(Region, chained_field="country", chained_model_field="country", show_all=False, auto_choose=True, sort=True, blank=True, null=True)
   subregion = ChainedForeignKey(SubRegion, chained_field="region", chained_model_field="region", show_all=False, auto_choose=True, sort=True, blank=True, null=True)
   city = ChainedForeignKey(City, chained_field="region", chained_model_field="region", show_all=False, auto_choose=True, sort=True, blank=True, null=True)
   contact_name = models.CharField(db_column='contact_name', max_length=30, blank=True, null=True)   
   address = models.CharField(db_column='address', max_length=50, blank=True, null=True)
   email = models.CharField(db_column='email', max_length=50, blank=True, null=True)
   phone = models.CharField(db_column='phone', max_length=30, blank=True, null=True)
   operator = models.BooleanField(db_column='operator', blank=True, default=True)
   owner = models.BooleanField(db_column='owner', blank=True, default=True)
   purchaser = models.BooleanField(db_column='purchaser', blank=True, default=True)
   transporter = models.BooleanField(db_column='transporter', blank=True, default=True)
   service = models.BooleanField(db_column='service', blank=True, default=False)
   
   def __str__(self):
      if self.name:
         return self.name
      if self.short_name:
         return self.short_name
      if self.country:
         return self.country
      if self.region:
         return self.region
      if self.subregion:
         return self.subregion
      if self.city:
         return self.city

   def get_parents(self):
      return ",".join([str(p) for p in self.parent.all()])

class Meta:
      db_table = 'company'
      ordering = ["name"]
      verbose_name = "company"
      verbose_name_plural = "companies"