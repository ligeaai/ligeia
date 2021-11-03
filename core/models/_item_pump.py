from django.db import models
import uuid
from core.models._base_equip import Equip_base

class Pump(Equip_base):
   battery_id = models.ForeignKey('battery', on_delete=models.CASCADE)
   measurement= models.CharField(db_column='measurement', max_length=15  ,blank=True)
   product= models.CharField(db_column='product', max_length=15  ,blank=True)
   type= models.CharField(db_column='type', max_length=15  ,blank=True)

   # stop_id = models.ForeignKey('pgdbmodel.Stop', on_delete=models.CASCADE)
   # route_many_id = models.ManyToManyField('pgdbmodel.Route', through='pgdbmodel.Route_itemref_pump')

   def __str__(self):
      if self.measurement:
         return self.measurement
      if self.product:
         return self.product
      if self.type:
         return self.type
         
class Meta:
      db_table = 'pump'