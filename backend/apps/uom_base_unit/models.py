import uuid
from django.db import models
from django.utils import timezone


class uom_base_unit(models.Model): 
	A=models.DecimalField(max_digits=1000, decimal_places=1000,null = False)
	B=models.DecimalField(max_digits=1000, decimal_places=1000,null = False)
	C=models.DecimalField(max_digits=1000, decimal_places=1000,null = False)
	D=models.DecimalField(max_digits=1000, decimal_places=1000,null = False)
	RESULT=models.DecimalField(max_digits=1000, decimal_places=1000,null = False)
	LAST_UPDT_USER=models.CharField(max_length=100,null=True,)
	LAST_UPDT_DATE=models.DateField(default=str(timezone.now()).split(' ')[0],null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,null=False,)
	DB_ID=models.CharField(max_length=32,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,null=False,db_index=True,primary_key = True)
	STATUS=models.CharField(max_length=10,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,null=True,)
