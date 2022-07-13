from django.db import models

class item_property (models.Model): 
    ITEM_ID = models.CharField(max_digits = 32,identity = False,null = False,PkOrder = 1)
    ITEM_TYPE = models.CharField(max_digits = 14,identity = False,null = False)
    START_DATETIME = models.DateField(identity = False,null = False,PkOrder = 3)
    END_DATETIME = models.DateField(identity = False,null = False,DefaultValueType = EndDatetime,PkOrder = 4)
    PROPERTY_TYPE = models.CharField(max_digits = 15,identity = False,null = False,PkOrder = 2)
    PROPERTY_VALUE = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    PROPERTY_DATE = models.DateField(identity = False,null = True)
    PROPERTY_STRING = models.CharField(max_digits = 200,identity = False,null = True)
    LAST_UPDT_USER = models.CharField(max_digits = 100,identity = False,null = True)
    LAST_UPDT_DATE = models.DateField(identity = False,null = True,DefaultValueType = Now)
    VERSION = models.CharField(max_digits = 32,identity = False,null = False,DefaultValueType = Guid)
    DB_ID = models.CharField(max_digits = 32,identity = False,null = True)
    ROW_ID = models.CharField(max_digits = 32,identity = False,null = False,DefaultValueType = Guid)
    STATUS = models.CharField(max_digits = 10,identity = False,null = True)
    REV_GRP_ID = models.CharField(max_digits = 32,identity = False,null = True)
    UPDATE_SOURCE = models.CharField(max_digits = 1,identity = False,null = True,DefaultValueType = SourceType)
    CREATE_SOURCE = models.CharField(max_digits = 1,identity = False,null = True,DefaultValueType = SourceType)
    