from django.db import models

class code_list (models.Model): 
    LISTTYPE = models.CharField(null = False, max_length = 100)
    CULTURE = models.CharField(null = False, default = "Culture", max_length = 10)
    CODE = models.CharField(null = False, max_length = 100)
    CODETEXT = models.CharField(null = True, max_length = 100)
    PARENT = models.CharField(null = True, max_length = 100)
    LEGACYCODE = models.CharField(null = True, max_length = 50)
    VAL1 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL2 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL3 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL4 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL5 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL6 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL7 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL8 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL9 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    VAL10 = models.DecimalField(decimal_places = 12, null = True, max_digits = 28)
    DATE1 = models.DateField(null = True)
    DATE2 = models.DateField(null = True)
    DATE3 = models.DateField(null = True)
    DATE4 = models.DateField(null = True)
    DATE5 = models.DateField(null = True)
    CHAR1 = models.CharField(null = True, max_length = 1000)
    CHAR2 = models.CharField(null = True, max_length = 1000)
    CHAR3 = models.CharField(null = True, max_length = 1000)
    CHAR4 = models.CharField(null = True, max_length = 1000)
    CHAR5 = models.CharField(null = True, max_length = 1000)
    LAYER_NAME = models.CharField(null = False, max_length = 50)
    DESCRIPTION_ID = models.CharField(null = True, max_length = 100)
    HIDDEN = models.CharField(null = True, max_length = 5)
    LAST_UPDT_USER = models.CharField(null = False, default = "system", max_length = 100)
    LAST_UPDT_DATE = models.DateField(null = True, default = "2022-07-29")
    VERSION = models.CharField(null = False, default = "2dc6b96a1ff845ad97861d5bd7f73577", max_length = 32)
    DB_ID = models.CharField(null = True, max_length = 32)
    ROW_ID = models.CharField(null = False, default = "353298689add4c00aa881021e5633c33", max_length = 32)
    STATUS = models.CharField(null = True, max_length = 10)
    REV_GRP_ID = models.CharField(null = True, max_length = 32)
    