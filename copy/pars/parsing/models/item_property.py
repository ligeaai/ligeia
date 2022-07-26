from django.db import models

class item_property (models.Model): 
    ITEM_ID = models.CharField(null = False, max_length = 32)
    ITEM_TYPE = models.CharField(null = False, max_length = 14)
    START_DATETIME = models.DateField(null = False)
    END_DATETIME = models.DateField(null = False, default = "EndDatetime")
    PROPERTY_TYPE = models.CharField(null = False, max_length = 15)
    PROPERTY_VALUE = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    PROPERTY_DATE = models.DateField(null = True)
    PROPERTY_STRING = models.CharField(null = True, max_length = 200)
    LAST_UPDT_USER = models.CharField(null = True, max_length = 100)
    LAST_UPDT_DATE = models.DateField(null = True, default = "2022-07-26")
    VERSION = models.CharField(null = False, default = "2377f2c55fb141d2bb30627a7ba4e0e4", max_length = 32)
    DB_ID = models.CharField(null = True, max_length = 32)
    ROW_ID = models.CharField(null = False, default = "9b33588bf3464464992b4b232b586de2", max_length = 32)
    STATUS = models.CharField(null = True, max_length = 10)
    REV_GRP_ID = models.CharField(null = True, max_length = 32)
    UPDATE_SOURCE = models.CharField(null = True, default = "SourceType", max_length = 1)
    CREATE_SOURCE = models.CharField(null = True, default = "SourceType", max_length = 1)
    