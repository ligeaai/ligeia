from django.db import models

# Create your models here.
class roles(models.Model): 
    ROLES_ID = models.CharField(max_length=32, primary_key=True, null=False)
    ROLES_NAME = models.CharField(max_length=100, null=False,default="NAME")
    LAYER_NAME = models.CharField(max_length=100, null=False,default="LAYER")
    LAST_UPDATE_USER = models.CharField(max_length=100)
