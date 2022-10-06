from rest_framework import serializers
from .models import type_property
import uuid

class TypePropertySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_property
        fields = '__all__'
