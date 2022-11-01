from django.db import models
import uuid
class page_resource_list(models.Model): 
	CULTURE=models.CharField(max_length=10,primary_key=False,null=False,)
	MODEL = models.CharField(max_length=100,primary_key=False,null=False,)
	ID=models.CharField(max_length=100,null=False,primary_key=False)
	SHORT_LABEL=models.CharField(max_length=200,null=True,)
	PARENT=models.CharField(max_length=200,null=True,)
	ICON=models.CharField(max_length=100,null=True,)
	TITLE=models.CharField(max_length=50,null=True,)
	URL=models.CharField(max_length=500,null=True,)
	ROW_ID =models.CharField(max_length=32,default=uuid.uuid4,null=False,db_index=True,)
	
	
# Create your models here.
