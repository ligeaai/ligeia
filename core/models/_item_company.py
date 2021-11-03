from django.db import models
import uuid
from core.models._base_domain import Domain_base

class Company(Domain_base):
   name= models.CharField(db_column='name', max_length=15, blank=False, unique=True)
   contact_name= models.CharField(db_column='contact_name', max_length=15, blank=True, null=True)
   address= models.CharField(db_column='address', max_length=15, blank=True, null=True)
   email= models.CharField(db_column='email', max_length=15, blank=True, null=True)
   phone= models.CharField(db_column='phone', max_length=15, blank=True, null=True)
   operator= models.BooleanField(db_column='operator', blank=True, default=True)
   owner= models.BooleanField(db_column='owner', blank=True, default=True)
   purchaser= models.BooleanField(db_column='purchaser', blank=True, default=True)
   transporter= models.BooleanField(db_column='transporter', blank=True, default=True)
   #completion_id = models.ForeignKey('pgdbmodel.Completion', on_delete=models.CASCADE)
   #route_many_id = models.ManyToManyField('pgdbmodel.Route', through='pgdbmodel.Route_itemref_company')
   
   def __str__(self):
      if self.name:
         return self.name

class Meta:
      db_table = 'company'
      ordering = ["name"]
      verbose_name = "company"
      verbose_name_plural = "companies"