from django.db import models 
import uuid 
from django.utils import timezone 
class layer(models.Model): 
	LAYER_NAME=models.CharField(max_length=100,primary_key=False,null=False,)
	LAYER_LEVEL=models.CharField(max_length=100,primary_key=False,null=False,)
	LAYER_ORDER=models.DecimalField(max_digits=18,decimal_places=0,primary_key=False,null=False,)
	LAST_UPDT_USER=models.CharField(max_length=100,primary_key=False,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,primary_key=False,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,)
	DB_ID=models.CharField(max_length=32,primary_key=False,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,)
	STATUS=models.CharField(max_length=10,primary_key=False,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,primary_key=False,null=True,)
