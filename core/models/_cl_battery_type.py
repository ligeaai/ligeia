from django.db import models
import uuid
from django.utils import timezone


class Battery_type(models.Model):
    item_id = models.UUIDField(db_column='item_id',primary_key=True, default=uuid.uuid4, editable=False)
    last_updt_user = models.TextField(db_column='last_updt_user', max_length=15  ,blank=True)
    last_updt_date = models.DateTimeField(default=timezone.now)
    row_id= models.UUIDField( db_column='row_id', primary_key = False, default = uuid.uuid4, editable = False)
    update_source= models.CharField(db_column='update_source', max_length=15,blank=True)
    version = models.TextField(db_column='version', max_length=15  ,blank=True)
    code_text = models.CharField(db_column='code_text', max_length=15, blank=True, unique=True)
    code = models.CharField(db_column='code', max_length=15, blank=True, unique=True)       
    culture = models.CharField(db_column='culture', max_length=15, blank=True)

    def __str__(self):
        if self.code:
            return self.code
        if self.code_text:
            return self.code_text
        if self.culture:
            return self.culture

class Meta:
    db_table = 'battery_type'
    verbose_name = "battery type"
    verbose_name_plural = "battery types"