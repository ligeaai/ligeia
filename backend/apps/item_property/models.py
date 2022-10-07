from django.db import models 
import uuid 
from django.utils import timezone 
class item_property(models.Model): 
	ITEM_ID=models.CharField(max_length=32,primary_key=True,null=False,db_index=True,)
	ITEM_TYPE=models.CharField(max_length=14,null=False,db_index=True,)
	START_DATETIME=models.DateField(null=False,db_index=True,)
	END_DATETIME=models.DateField(default=timezone.now,null=False,db_index=True,)
	PROPERTY_TYPE=models.CharField(max_length=15,null=False,db_index=True,)
	PROPERTY_VALUE=models.DecimalField(max_digits=28,decimal_places=12,null=True,db_index=True,)
	PROPERTY_DATE=models.DateField(null=True,db_index=True,)
	PROPERTY_STRING=models.CharField(max_length=200,null=True,db_index=True,)
	LAST_UPDT_USER=models.CharField(max_length=100,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,null=False,)
	DB_ID=models.CharField(max_length=32,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,null=False,db_index=True,)
	STATUS=models.CharField(max_length=10,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,null=True,)
	UPDATE_SOURCE=models.CharField(max_length=1,default="SourceType",null=True,)
	CREATE_SOURCE=models.CharField(max_length=1,default="SourceType",null=True,)
