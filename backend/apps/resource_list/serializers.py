from rest_framework import serializers
from .models import resource_list
import uuid

class ResourceListSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = '__all__'

    # def create(self, validated_data):
    #         validated_data['VERSION'] = uuid.uuid4().hex
    #         validated_data['ROW_ID'] = uuid.uuid4().hex
    #         user = Type.objects.create(**validated_data)
    #         user.save()
    #         return user

class ResourceListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = '__all__'

class ResourceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = '__all__'