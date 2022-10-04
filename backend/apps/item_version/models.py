from django.db import models 
import uuid 
from django.utils import timezone 
class item_version(models.Model): 
	ITEM_ID=models.CharField(max_length=32,primary_key=False,null=False,db_index=True,)
	START_DATETIME=models.DateField(primary_key=False,null=False,db_index=True,)
	END_DATETIME=models.DateField(default=timezone.now,primary_key=False,null=True,db_index=True,)
	LAST_UPDT_USER=models.CharField(max_length=100,primary_key=False,null=True,)
	LAST_UPDT_DATE=models.DateField(default=timezone.now,primary_key=False,null=True,)
	VERSION=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,)
	DB_ID=models.CharField(max_length=32,primary_key=False,null=True,)
	ROW_ID=models.CharField(max_length=32,default=uuid.uuid4,primary_key=False,null=False,db_index=True,)
	STATUS=models.CharField(max_length=10,primary_key=False,null=True,)
	REV_GRP_ID=models.CharField(max_length=32,primary_key=False,null=True,)
	UPDATE_SOURCE=models.CharField(max_length=1,default="SourceType",primary_key=False,null=True,)
	CREATE_SOURCE=models.CharField(max_length=1,default="SourceType",primary_key=False,null=True,)
