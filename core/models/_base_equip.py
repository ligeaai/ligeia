from django.db import models
import uuid
from core.models._base_domain import Domain_base


class Equip_base(Domain_base):
    acc_id= models.CharField(db_column='acc_id', max_length=15  ,blank=True)
    btu_hp_hr= models.DecimalField(db_column='btu_hp_hr', max_digits=12, decimal_places=8,blank=True)
    disp_type= models.CharField(db_column='disp_type', max_length=15  ,blank=True)
    fdc_id= models.CharField(db_column='fdc_id', max_length=15  ,blank=True)
    fuel_factor= models.DecimalField(db_column='fuel_factor', max_digits=12, decimal_places=8,blank=True)
    fuel_method= models.CharField(db_column='fuel_method', max_length=15  ,blank=True)
    hp_total= models.DecimalField(db_column='hp_total', max_digits=12, decimal_places=8,blank=True)
    number= models.CharField(db_column='number', max_length=15  ,blank=True)
    power_source= models.CharField(db_column='power_source', max_length=15  ,blank=True)
    def __str__(self):
        if self.acc_id:
           return self.acc_id
        if self.disp_type:
           return self.disp_type
        if self.fdc_id:
           return self.fdc_id
        if self.fuel_method:
           return self.fuel_method
        if self.number:
           return self.number
        if self.power_source:
           return self.power_source
class Meta:
      db_table = 'equip_base'