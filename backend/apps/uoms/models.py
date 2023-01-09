import uuid

from django.db import models
from django.utils import timezone


class uom(models.Model): 
	NAME=models.CharField(max_length=50,null=False,db_index=True)
	QUALITY_TYPE=models.CharField(max_length=1000,null=False)
	CATALOG_NAME=models.CharField(max_length=1000,null=False)
	CATALOG_SYMBOL=models.CharField(max_length=1000,null=False)
	RP66_SYMBOL=models.CharField(max_length=1000,null=True)
	BASE_UNIT=models.CharField(max_length=1000,null=True)
	A=models.CharField(max_length=100,null=True,)
	B=models.CharField(max_length=100,null=True,)
	C=models.CharField(max_length=100,null=True,)
	D=models.CharField(max_length=100,null=True,)
	RESULT=models.CharField(max_length=100,null=True,)
	LAST_UPDT_USER=models.CharField(max_length=100,null=True,)
	LAST_UPDT_DATE=models.DateField(default=str(timezone.now()).split(' ')[0],null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4().hex,null=False,)
	DB_ID=models.CharField(max_length=32,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,null=False,db_index=True,primary_key = True)
	STATUS=models.CharField(max_length=10,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,null=True,)
 