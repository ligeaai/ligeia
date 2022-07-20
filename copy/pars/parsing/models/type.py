from django.db import models

class type (models.Model): 
    TYPE = models.CharField(null = False, primary_key = 1, max_length = 14)
    TYPE_CLASS = models.CharField(null = False, max_length = 50)
    LABEL_ID = models.CharField(null = True, max_length = 100)
    CHANGE_INTERVAL = models.CharField(null = True, max_length = 10)
    LAYER_NAME = models.CharField(null = False, max_length = 50)
    DESCRIPTION_ID = models.CharField(null = True, max_length = 100)
    HIDDEN = models.CharField(null = True, max_length = 5)
    BASE_TYPE = models.CharField(null = True, max_length = 14)
    CODE_LIST_TYPE = models.CharField(null = True, max_length = 50)
    IS_QUICK_LINK = models.CharField(null = True, max_length = 5)
    PROP_TBL_NAME = models.CharField(null = True, max_length = 50)
    BASE_TBL_NAME = models.CharField(null = True, max_length = 50)
    TAG_TBL_NAME = models.CharField(null = True, max_length = 50)
    LAST_UPDT_USER = models.CharField(null = True, max_length = 100)
    LAST_UPDT_DATE = models.DateField(null = True, default = "Now")
    VERSION = models.CharField(null = False, default = "Guid", max_length = 32)
    DB_ID = models.CharField(null = True, max_length = 32)
    ROW_ID = models.CharField(null = False, default = "Guid", max_length = 32)
    STATUS = models.CharField(null = True, max_length = 10)
    REV_GRP_ID = models.CharField(null = True, max_length = 32)
    