# <UnitOfMeasure Id="A" 
# Name="ampere" 
# DimensionClass="C" 
# BaseUomId="A" 
# CatalogName="POSC" 
# ConversionType="Factor" 
# Start="1900-01-01T00:00:00" 
# End="9000-01-01T00:00:00" 
# A="0.000000000000" 
# B="1.000000000000" 
# C="1.000000000000" 
# D="0.000000000000" />


from django.db import models
import uuid
from django.conf import settings
from mptt.models import MPTTModel, TreeForeignKey

class Base_UOM(MPTTModel):
    code_id = models.CharField(db_column='code_id', max_length=100, blank=False, unique=True, verbose_name='CodeID')
    code_name = models.CharField(db_column='code_name', max_length=100, null=True, blank=False, unique=False, verbose_name='Code Name')
    property_class = models.CharField(db_column='property_class', max_length=100, null=True, blank=False, unique=False, verbose_name='Property Class')
    dimension_class = models.CharField(db_column='dimension_class', max_length=100, null=True, blank=False, unique=False, verbose_name='Dimenstion Class')
    base_uom_id = models.CharField(db_column='base_uom_id', max_length=100, blank=False, verbose_name='Base UOM ID')
    catalog_name = models.CharField(db_column='catalog_name', max_length=100, blank=True, unique=False, verbose_name='Catalog Name')
    metric_system = models.CharField(db_column='metric_system', max_length=100, blank=True, unique=False, null=True, verbose_name='Metric System')
    conversion_type= models.CharField(db_column='conversion_type', max_length=100, blank=True, null=True, unique=False, verbose_name='Conversion Type')
    A = models.DecimalField(db_column='A', max_digits=120, decimal_places=100, blank=True)
    B = models.DecimalField(db_column='B', max_digits=120, decimal_places=100, blank=True)
    C = models.DecimalField(db_column='C', max_digits=120, decimal_places=100, blank=True)
    D = models.DecimalField(db_column='D', max_digits=120, decimal_places=100, blank=True)
    parent = TreeForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE, verbose_name='Parent')

    last_updt_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, editable=False, null=True, verbose_name='Last Update User')
    last_updt_date = models.DateTimeField(auto_now=True, blank=True, editable=False, null=True, verbose_name='Last Update Date')
    row_id = models.UUIDField(db_column='row_id', primary_key=False, default=uuid.uuid4, editable=False, null=True, verbose_name='Row ID')
    create_source = models.CharField(db_column='create_source', max_length=100, blank=True, editable=False, null=True, verbose_name='Create Source')
    update_source = models.CharField(db_column='update_source', max_length=100, blank=True, editable=False, null=True, verbose_name='Update Source')
    version = models.CharField(db_column='version', max_length=100, blank=True, editable=False, null=True, verbose_name='Version')

    def __str__(self):
        if self.code_name:
            return str(self.code_name)
        if self.code_id:
            return str(self.code_id)

    def __str__(self):
        full_path = [self.code_name]
        k = self.parent
        while k is not None:
            full_path.append(k.code_name)
            k = k.parent
        return ' / '.join(full_path[::-1])


class MPTTMeta:
    db_table = 'UOM'
    order_insertion_by = ["code_id"]
    verbose_name = "UOM"
    verbose_name_plural = "UOMs"