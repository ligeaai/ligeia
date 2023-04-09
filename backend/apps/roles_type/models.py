from django.db import models
import uuid 
from django.utils import timezone 

class roles_type(models.Model): 
	ROLES_TYPE=models.CharField(max_length=100,null=False,)
	ROLES_INFO=models.CharField(max_length=100,null=False,)
	ROW_ID=models.CharField(max_length=32,primary_key=True,null=False,)
	