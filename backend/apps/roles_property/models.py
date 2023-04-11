from django.db import models
from apps.roles.models import roles

class roles_property(models.Model): 
    ROLES_ID = models.ManyToManyField(roles, related_name="roles")
    ROLES_TYPES = models.CharField(max_length=100, null=False)
    ROLES_INFO = models.CharField(max_length=100, null=True)
    CREATE = models.BooleanField(default=False)
    READ = models.BooleanField(default=False)
    UPDATE = models.BooleanField(default=False)
    DELETE = models.BooleanField(default=False)
    ROW_ID = models.CharField(max_length=32, primary_key=True, null=False)
