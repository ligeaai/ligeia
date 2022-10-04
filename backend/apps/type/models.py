from django.db import models 
import uuid 
from django.utils import timezone 
class type(models.Model): 
	TYPE=models.CharField(max_length=14,primary_key=False,null=False,)
	TYPE_CLASS=models.CharField(max_length=50,primary_key=False,null=False,)
	LABEL_ID=models.CharField(max_length=100,primary_key=False,null=True,)
	CHANGE_INTERVAL=models.CharField(max_length=10,primary_key=False,null=True,)
	LAYER_NAME=models.CharField(max_length=50,primary_key=False,null=False,)
	DESCRIPTION_ID=models.CharField(max_length=100,primary_key=False,null=True,)
	HIDDEN=models.CharField(max_length=5,primary_key=False,null=True,)
	BASE_TYPE=models.CharField(max_length=14,primary_key=False,null=True,)
	CODE_LIST_TYPE=models.CharField(max_length=50,primary_key=False,null=True,)
	IS_QUICK_LINK=models.CharField(max_length=5,primary_key=False,null=True,)
	PROP_TBL_NAME=models.CharField(max_length=50,primary_key=False,null=True,)
	BASE_TBL_NAME=models.CharField(max_length=50,primary_key=False,null=True,)
	TAG_TBL_NAME=models.CharField(max_length=50,primary_key=False,null=True,)
	LAST_UPDT_USER=models.CharField(max_length=100,primary_key=False,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,primary_key=False,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,)
	DB_ID=models.CharField(max_length=32,primary_key=False,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,db_index=True,)
	STATUS=models.CharField(max_length=10,primary_key=False,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,primary_key=False,null=True,)
