from django.db import models
from django.utils import timezone
import uuid

class Domain_base(models.Model):
   item_id = models.UUIDField(db_column='item_id',primary_key=True, default=uuid.uuid4, editable=False)
   last_updt_user = models.TextField(db_column='last_updt_user', max_length=15, blank=True)
   last_updt_date = models.DateTimeField(default=timezone.now)
   row_id= models.UUIDField(db_column='row_id', primary_key = False, default = uuid.uuid4, editable = False)
   update_source= models.CharField(db_column='update_source', max_length=15, blank=True)
   version = models.TextField(db_column='version', max_length=15, blank=True)

   # x= models.DecimalField(db_column='x', max_digits=12, decimal_places=8,blank=True)
   # y= models.DecimalField(db_column='y', max_digits=12, decimal_places=8,blank=True)
   
   # def __str__(self):
   #    if self.last_updt_user:
   #       return self.last_updt_user
   #    if self.last_updt_date:
   #       return self.last_updt_date
      
class Meta:
      db_table = 'domain_base'
      unique_together=(('item_id'),)