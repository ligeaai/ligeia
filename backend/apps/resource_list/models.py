import uuid

from django.db import models
from django.utils import timezone


class resource_list(models.Model): 
	CULTURE=models.CharField(max_length=10,primary_key=False,null=False,)
	ID=models.CharField(max_length=100,null=False,primary_key=False)
	SHORT_LABEL=models.CharField(max_length=200,null=True,)
	MOBILE_LABEL=models.CharField(max_length=200,null=True,)
	ICON=models.CharField(max_length=100,null=True,)
	PARENT=models.CharField(max_length=500,null=True,)
	LAYER_NAME=models.CharField(max_length=50,null=False,)
	HIDDEN=models.CharField(max_length=5,null=True,)
	LAST_UPDT_USER=models.CharField(max_length=100,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4().hex,null=False,)
	DB_ID=models.CharField(max_length=32,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4().hex,null=False,db_index=True,)
	STATUS=models.CharField(max_length=10,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,null=True,)
