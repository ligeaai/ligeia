from django.db import models 
import uuid 
from django.utils import timezone 
class type_uom(models.Model): 
	PROPERTY_CLASS=models.CharField(max_length=100,primary_key=False,null=False,)
	UOM=models.CharField(max_length=50,primary_key=False,null=False,)
	LENGTH=models.DecimalField(max_digits=28,decimal_places=12,primary_key=False,null=False,)
	DECIMALS=models.DecimalField(max_digits=28,decimal_places=12,primary_key=False,null=False,)
	LAYER_NAME=models.CharField(max_length=50,primary_key=False,null=False,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,db_index=True,)
	LAST_UPDT_USER=models.CharField(max_length=100,primary_key=False,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,primary_key=False,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,)
	DB_ID=models.CharField(max_length=32,primary_key=False,null=True,)
	STATUS=models.CharField(max_length=10,primary_key=False,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,primary_key=False,null=True,)
