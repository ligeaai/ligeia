import uuid
from rest_framework import serializers
from .models import roles_type

class RolesTypeSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = roles_type
        fields = "__all__"