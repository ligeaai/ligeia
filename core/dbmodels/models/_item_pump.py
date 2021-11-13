from django.db import models
import uuid
from dbmodels.models._base_equip import Base_equip

class Pump(Base_equip):
   battery_id = models.ForeignKey('battery', on_delete=models.CASCADE)
   measurement= models.CharField(db_column='measurement', max_length=15  ,blank=True)
   product= models.ForeignKey('type_battery', on_delete=models.CASCADE, blank=True, null=True)
   type= models.ForeignKey('type_pump', on_delete=models.CASCADE, blank=True, null=True)

   def __str__(self):
      if self.measurement:
         return self.measurement
      if self.product:
         return self.product
      if self.type:
         return self.type
         
class Meta:
      db_table = 'pump'