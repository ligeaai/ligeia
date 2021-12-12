from django.db import models
from cities_light.models import City, Region, Country, SubRegion, Region
from smart_selects.db_fields import ChainedForeignKey
from ._base_domain import Base_domain


class Company(Base_domain):
    company_ref = models.ManyToManyField('self', blank=True, symmetrical=False, verbose_name='Parent Company')
    country = models.CharField(db_column='country', max_length=100, blank=True, null=True, verbose_name='Country')
    region = models.CharField(db_column='region', max_length=100, blank=True, null=True, verbose_name='Region')
    subregion = models.CharField(db_column='subregion', max_length=100, blank=True, null=True, verbose_name='Sub-Region')
    city = models.CharField(db_column='city', max_length=100, blank=True, null=True, verbose_name='City')
    contact_name = models.CharField(db_column='contact_name', max_length=100, blank=True, null=True, verbose_name='Contact Name')
    address = models.CharField(db_column='address', max_length=100, blank=True, null=True, verbose_name='Address')
    email = models.EmailField(db_column='email', max_length=100, blank=True, null=True, verbose_name='e-mail')
    phone = models.CharField(db_column='phone', max_length=100, blank=True, null=True, verbose_name='Phone')
    operator = models.BooleanField(db_column='operator', blank=True, default=True, verbose_name='Operator')
    owner = models.BooleanField(db_column='owner', blank=True, default=True, verbose_name='Owner')
    purchaser = models.BooleanField(db_column='purchaser', blank=True, default=True, verbose_name='Purchaser')
    transporter = models.BooleanField(db_column='transporter', blank=True, default=True, verbose_name='Transporter')
    service = models.BooleanField(db_column='service', blank=True, default=False, verbose_name='Service Provider')

    def __unicode__(self):
        return self.name

    def __str__(self):
        if self.name:
            return self.name
        elif self.short_name:
            return self.short_name
        elif self.country:
            return self.country
        elif self.region:
            return self.region
        elif self.subregion:
            return self.subregion
        elif self.city:
            return self.city

    def get_company_ref(self):
        return ",".join([str(p) for p in self.company_ref.all()])


class Meta:    
    app_label = 'app.db_models'
    ordering = ["name"]
    verbose_name = "company"
    verbose_name_plural = "companies"
