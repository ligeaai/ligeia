from django.db import models
from django.utils import timezone
import uuid

class Codelist_base(models.Model):    
    item_id = models.UUIDField(db_column='item_id',primary_key=True, default=uuid.uuid4, editable=False)
    # name= models.CharField(db_column='name', max_length=15  ,blank=False)
    last_updt_user = models.TextField(db_column='last_updt_user', max_length=15  ,blank=True)
    last_updt_date = models.DateTimeField(default=timezone.now)
    version = models.TextField(db_column='version', max_length=15  ,blank=True)
    # x= models.DecimalField(db_column='x', max_digits=12, decimal_places=8,blank=True)
    # y= models.DecimalField(db_column='y', max_digits=12, decimal_places=8,blank=True)

    def __str__(self):
        if self.last_updt_user:
            return self.last_updt_user

class Meta:
    db_table = 'codelist_base'
    unique_together=(('item_id'),)