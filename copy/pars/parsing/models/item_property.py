from django.db import models

class item_property (models.Model): 
    ITEM_ID = models.CharField(null = False, primary_key = 1, max_length = 32)
    ITEM_TYPE = models.CharField(null = False, max_length = 14)
    START_DATETIME = models.DateField(null = False, primary_key = 3)
    END_DATETIME = models.DateField(null = False, default = "EndDatetime", primary_key = 4)
    PROPERTY_TYPE = models.CharField(null = False, primary_key = 2, max_length = 15)
    PROPERTY_VALUE = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    PROPERTY_DATE = models.DateField(null = True)
    PROPERTY_STRING = models.CharField(null = True, max_length = 200)
    LAST_UPDT_USER = models.CharField(null = True, max_length = 100)
    LAST_UPDT_DATE = models.DateField(null = True, default = "Now")
    VERSION = models.CharField(null = False, default = "Guid", max_length = 32)
    DB_ID = models.CharField(null = True, max_length = 32)
    ROW_ID = models.CharField(null = False, default = "Guid", max_length = 32)
    STATUS = models.CharField(null = True, max_length = 10)
    REV_GRP_ID = models.CharField(null = True, max_length = 32)
    UPDATE_SOURCE = models.CharField(null = True, default = "SourceType", max_length = 1)
    CREATE_SOURCE = models.CharField(null = True, default = "SourceType", max_length = 1)
    