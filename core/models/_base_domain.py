from django.db import models
from django.utils import timezone
import uuid

class Base_domain(models.Model):
   start_datetim = models.DateTimeField(default=timezone.now, blank=False)
   end_datetime = models.DateTimeField(db_column='end_datetime',auto_now=False, auto_now_add=False, blank=True)
   name = models.CharField(db_column='name', max_length=30, blank=False, unique=True)
   short_name = models.CharField(db_column='short_name', max_length=30, blank=True, unique=True)
   operated = models.BooleanField(db_column='operated',default=True)
   active = models.BooleanField(db_column='active',blank=False, default=True)
   item_id = models.UUIDField(db_column='item_id',primary_key=True, default=uuid.uuid4, editable=False)
   last_updt_user = models.CharField(db_column='last_updt_user', max_length=15, blank=True)
   last_updt_date = models.DateTimeField(default=timezone.now)
   culture = models.CharField(db_column='culture', max_length=15, blank=True, null=True, unique=True)
   row_id = models.UUIDField( db_column='row_id', primary_key = False, default = uuid.uuid4, editable = False)
   update_source = models.CharField(db_column='update_source', max_length=15,blank=True)
   version = models.CharField(db_column='version', max_length=15  ,blank=True)

   # x= models.DecimalField(db_column='x', max_digits=12, decimal_places=8,blank=True)
   # y= models.DecimalField(db_column='y', max_digits=12, decimal_places=8,blank=True)
   
   # def __str__(self):
   #    if self.last_updt_user:
   #       return self.last_updt_user
   #    if self.last_updt_date:
   #       return self.last_updt_date
      
class Meta:
      db_table = 'base_domain'
      unique_together=(('item_id'),)