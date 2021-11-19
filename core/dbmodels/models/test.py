from smart_selects.db_fields import ChainedForeignKey, ChainedManyToManyField
from django.db import models




class PropertyClass(models.Model):    
    name = models.CharField(max_length=255)
    code_name = models.CharField(max_length=255)

    def __str__(self):
        if self.name:
            return self.name    

class BaseUOMID(models.Model):
    property = models.ForeignKey(PropertyClass,  on_delete=models.CASCADE)
    code_id = models.CharField(
        db_column='code_id', max_length=100, blank=False, unique=True, verbose_name='Code ID')
    code_name = models.CharField(db_column='code_name', max_length=100,
                                 null=True, blank=False, unique=False, verbose_name='Code Name')


    def __str__(self):
        if self.code_name:
            return self.code_name

class UOM(models.Model):
    property = models.ForeignKey(PropertyClass,  on_delete=models.CASCADE)    
    base_id = ChainedForeignKey(
        BaseUOMID,
        chained_field="property",
        chained_model_field="property",
        show_all=False,
        auto_choose=True,
        sort=True)
    # area = models.ForeignKey(Area)
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.symbol} - {self.name}"

class UOM2(models.Model):
    base_uom_id = models.ForeignKey(BaseUOMID,  on_delete=models.CASCADE)
    propertly_class = ChainedManyToManyField(
        PropertyClass,
        chained_field="base_uom_id",
        chained_model_field="base_uom_id",
        horizontal=True,
        # show_all=False,
        auto_choose=True,
        # sort=True
        )
    # area = models.ForeignKey(Area)
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.symbol} - {self.name}"

class Test(models.Model):
    name = models.CharField(max_length=50)
    location = models.ForeignKey(UOM,  on_delete=models.CASCADE)