from django.db import models
from cities_light.models import City, Region, Country, SubRegion, Region
from smart_selects.db_fields import ChainedForeignKey
from dbmodels.models._base_domain import Base_domain


class Field(Base_domain):
    latitude = models.CharField(
        db_column='latitude', max_length=100, blank=True, null=True, verbose_name='Latitude')
    longitude = models.CharField(
        db_column='longitude',  max_length=100, blank=True, null=True, verbose_name='Longitude')
    product= models.ForeignKey('type_product', on_delete=models.CASCADE, blank=True, null=True, verbose_name='Product')
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Country')
    region = ChainedForeignKey(Region, chained_field="country", chained_model_field="country",
                               show_all=False, auto_choose=True, sort=True, blank=True, null=True, verbose_name='Region')
    subregion = ChainedForeignKey(SubRegion, chained_field="region", chained_model_field="region",
                                  show_all=False, auto_choose=True, sort=True, blank=True, null=True, verbose_name='Sub-Region')
    city = ChainedForeignKey(City, chained_field="region", chained_model_field="region",
                             show_all=False, auto_choose=True, sort=True, blank=True, null=True, verbose_name='City')
    company_ref = models.ForeignKey(
        'company', on_delete=models.CASCADE, null=True, blank=True, verbose_name='Company Ref.')

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
    db_table = 'field'
    ordering = ["name"]
    verbose_name = "field"
    verbose_name_plural = "fields"
