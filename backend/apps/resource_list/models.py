from django.db import models 
import uuid 
from django.utils import timezone 
class resource_list(models.Model): 
	CULTURE=models.CharField(max_length=10,primary_key=False,null=False,)
	ID=models.CharField(max_length=100,primary_key=False,null=False,)
	SHORT_LABEL=models.CharField(max_length=200,primary_key=False,null=True,)
	MOBILE_LABEL=models.CharField(max_length=200,primary_key=False,null=True,)
	LAYER_NAME=models.CharField(max_length=50,primary_key=False,null=False,)
	HIDDEN=models.CharField(max_length=5,primary_key=False,null=True,)
	LAST_UPDT_USER=models.CharField(max_length=100,primary_key=False,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,primary_key=False,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,)
	DB_ID=models.CharField(max_length=32,primary_key=False,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,db_index=True,)
	STATUS=models.CharField(max_length=10,primary_key=False,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,primary_key=False,null=True,)
