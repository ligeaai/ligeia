from django.db import models
from ._base_domain import Base_domain

class Field(Base_domain):
    latitude = models.CharField(db_column='latitude', max_length=100, blank=True, null=True, verbose_name='Latitude')
    longitude = models.CharField(db_column='longitude',  max_length=100, blank=True, null=True, verbose_name='Longitude')
    
    product= models.CharField(db_column='product', max_length=100, blank=True, null=True, verbose_name='Product')
    country = models.CharField(db_column='country', max_length=100, blank=True, null=True, verbose_name='Country')
    region = models.CharField(db_column='region', max_length=100, blank=True, null=True, verbose_name='Region')
    subregion = models.CharField(db_column='subregion', max_length=100, blank=True, null=True, verbose_name='Sub-Region')
    city = models.CharField(db_column='city', max_length=100, blank=True, null=True, verbose_name='City')
    company_ref = models.ForeignKey('company', on_delete=models.CASCADE, null=True, blank=True, verbose_name='Company Ref.')

    def __str__(self):
        if self.name:
            return self.name
        if self.accounting_id:
            return self.accounting_id
        if self.serial_id:
            return self.serial_id
        if self.registry_id:
            return self.registry_id

    # def get_parents(self):
    #     return ",".join([str(p) for p in self.parent.all()])


class Meta:
    app_label = 'app.db_models'
    ordering = ["name"]
    verbose_name = "field"
    verbose_name_plural = "fields"
