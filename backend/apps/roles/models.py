from django.db import models
from apps.roles_property.models import roles_property

# Create your models here.
class roles(models.Model): 
    PROPERTY_ID = models.ManyToManyField(roles_property, related_name="roles")
    ROLES_ID = models.CharField(max_length=32, primary_key=True, null=False)
    ROLES_NAME = models.CharField(max_length=100, null=False,default="NAME")
    LAYER_NAME = models.CharField(max_length=100, null=False,default="LAYER")
    LAST_UPDATE_USER = models.CharField(max_length=100)
