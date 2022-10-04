from django.db import models 
import uuid 
from django.utils import timezone 
class type_property(models.Model): 
	TYPE=models.CharField(max_length=14,primary_key=False,null=False,)
	PROPERTY_NAME=models.CharField(max_length=15,primary_key=False,null=False,)
	PROP_GRP=models.CharField(max_length=50,primary_key=False,null=True,)
	PROP_GRP_PRNT=models.CharField(max_length=50,primary_key=False,null=True,)
	LABEL_ID=models.CharField(max_length=100,primary_key=False,null=True,)
	TABLE_NAME=models.CharField(max_length=50,primary_key=False,null=True,)
	COLUMN_NAME=models.CharField(max_length=50,primary_key=False,null=True,)
	PROPERTY_TYPE=models.CharField(max_length=100,primary_key=False,null=True,)
	PROPERTY_CLASS=models.CharField(max_length=100,primary_key=False,null=True,)
	UNICODE=models.CharField(max_length=5,primary_key=False,null=True,)
	CODE_LIST=models.CharField(max_length=100,primary_key=False,null=True,)
	CODE_LIST_FLTR=models.CharField(max_length=100,primary_key=False,null=True,)
	CODE_LIST_LVL=models.DecimalField(max_digits=18,decimal_places=0,primary_key=False,null=True,)
	PARENT_CL_PROP=models.CharField(max_length=15,primary_key=False,null=True,)
	VALUE_FILTER=models.CharField(max_length=100,primary_key=False,null=True,)
	UI_EDIT_CLASS=models.CharField(max_length=100,primary_key=False,null=True,)
	SORT_ORDER=models.DecimalField(max_digits=18,decimal_places=0,primary_key=False,null=True,)
	MANDATORY=models.CharField(max_length=5,primary_key=False,null=True,)
	HIDDEN=models.CharField(max_length=5,primary_key=False,null=True,)
	IS_KEY=models.CharField(max_length=5,primary_key=False,null=True,)
	LENGTH=models.DecimalField(max_digits=28,decimal_places=12,primary_key=False,null=True,)
	DECIMALS=models.DecimalField(max_digits=28,decimal_places=12,primary_key=False,null=True,)
	UOM=models.CharField(max_length=50,primary_key=False,null=True,)
	CHANGE_INTERVAL=models.CharField(max_length=10,default="ChangeInterval",primary_key=False,null=True,)
	DEFAULT_VALUE=models.CharField(max_length=50,primary_key=False,null=True,)
	LAYER_NAME=models.CharField(max_length=50,primary_key=False,null=False,)
	DESCRIPTION_ID=models.CharField(max_length=100,primary_key=False,null=True,)
	LAST_UPDT_USER=models.CharField(max_length=100,primary_key=False,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,primary_key=False,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,)
	DB_ID=models.CharField(max_length=32,primary_key=False,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,db_index=True,)
	STATUS=models.CharField(max_length=10,primary_key=False,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,primary_key=False,null=True,)
	PROP_UNIQUE=models.CharField(max_length=20,primary_key=False,null=True,)
	ALLOW_MULTI_EDIT=models.CharField(max_length=5,primary_key=False,null=True,)
	DEF_ACCUM_FUNC=models.CharField(max_length=20,primary_key=False,null=True,)
