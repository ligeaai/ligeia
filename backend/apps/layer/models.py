from django.db import models 
import uuid 
from django.utils import timezone 
class layer(models.Model): 
	LAYER_NAME=models.CharField(max_length=100,primary_key=True,null=False,)
	LAYER_LEVEL=models.CharField(max_length=100,null=False,)
	LAYER_ORDER=models.DecimalField(max_digits=18,decimal_places=0,null=False,)
	LAST_UPDT_USER=models.CharField(max_length=100,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,null=False,)
	DB_ID=models.CharField(max_length=32,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,null=False,)
	STATUS=models.CharField(max_length=10,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,null=True,)