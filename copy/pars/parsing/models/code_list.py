from django.db import models

class code_list (models.Model): 
    LIST_TYPE = models.CharField(max_digits = 100,identity = False,null = False)
    CULTURE = models.CharField(max_digits = 10,identity = False,null = False,DefaultValueType = "Culture")
    CODE = models.CharField(max_digits = 100,identity = False,null = False)
    CODE_TEXT = models.CharField(max_digits = 100,identity = False,null = True)
    PARENT = models.CharField(max_digits = 100,identity = False,null = True)
    LEGACY_CODE = models.CharField(max_digits = 50,identity = False,null = True)
    VAL1 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL2 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL3 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL4 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL5 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL6 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL7 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL8 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL9 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    VAL10 = models.DecimalField(max_digits = 28,decimal_places = 12,identity = False,null = True)
    DATE1 = models.DateField(identity = False,null = True)
    DATE2 = models.DateField(identity = False,null = True)
    DATE3 = models.DateField(identity = False,null = True)
    DATE4 = models.DateField(identity = False,null = True)
    DATE5 = models.DateField(identity = False,null = True)
    CHAR1 = models.CharField(max_digits = 1000,identity = False,null = True)
    CHAR2 = models.CharField(max_digits = 1000,identity = False,null = True)
    CHAR3 = models.CharField(max_digits = 1000,identity = False,null = True)
    CHAR4 = models.CharField(max_digits = 1000,identity = False,null = True)
    CHAR5 = models.CharField(max_digits = 1000,identity = False,null = True)
    LAYER_NAME = models.CharField(max_digits = 50,identity = False,null = False)
    DESCRIPTION_ID = models.CharField(max_digits = 100,identity = False,null = True)
    HIDDEN = models.CharField(max_digits = 5,identity = False,null = True)
    LAST_UPDT_USER = models.CharField(max_digits = 100,identity = False,null = True)
    LAST_UPDT_DATE = models.DateField(identity = False,null = True,DefaultValueType = "Now")
    VERSION = models.CharField(max_digits = 32,identity = False,null = False,DefaultValueType = "Guid")
    DB_ID = models.CharField(max_digits = 32,identity = False,null = True)
    ROW_ID = models.CharField(max_digits = 32,identity = False,null = False,DefaultValueType = "Guid",PkOrder = 1)
    STATUS = models.CharField(max_digits = 10,identity = False,null = True)
    REV_GRP_ID = models.CharField(max_digits = 32,identity = False,null = True)
    