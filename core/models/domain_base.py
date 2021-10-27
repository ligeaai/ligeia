from django.db import models
import uuid
class Domain_base(models.Model):
    item_id = models.UUIDField(db_column='item_id',primary_key=True, default=uuid.uuid4, editable=False)
    active= models.BooleanField(db_column='active',blank=False)
    data_status= models.CharField(db_column='data_status', max_length=15  ,blank=True)
    latitude= models.DecimalField(db_column='latitude', max_digits=12, decimal_places=8,blank=True)
    legacy_id= models.CharField(db_column='legacy_id', max_length=15  ,blank=True)
    longitude= models.DecimalField(db_column='longitude', max_digits=12, decimal_places=8,blank=True)
    name= models.CharField(db_column='name', max_length=15  ,blank=False)
    north= models.BooleanField(db_column='north',blank=True)
    spheroid= models.CharField(db_column='spheroid', max_length=15  ,blank=True)
    time_zone= models.DecimalField(db_column='time_zone', max_digits=12, decimal_places=8,blank=True)
    x= models.DecimalField(db_column='x', max_digits=12, decimal_places=8,blank=True)
    y= models.DecimalField(db_column='y', max_digits=12, decimal_places=8,blank=True)
    zone1= models.DecimalField(db_column='zone', max_digits=12, decimal_places=8,blank=True)
    def __str__(self):
        if self.data_status:
           return self.data_status
        if self.legacy_id:
           return self.legacy_id
        if self.name:
           return self.name
        if self.spheroid:
           return self.spheroid
class Meta:
      db_table = 'Domain_base'
      unique_together=(('item_id'),)