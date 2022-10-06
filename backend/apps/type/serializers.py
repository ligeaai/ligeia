from rest_framework import serializers
from .models import type as Type
import uuid

class TypeSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

    def create(self, validated_data):
            validated_data['VERSION'] = uuid.uuid4().hex
            validated_data['ROW_ID'] = uuid.uuid4().hex
            user = Type.objects.create(**validated_data)
            user.save()
            return user