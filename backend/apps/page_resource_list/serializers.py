import uuid
from rest_framework import serializers
from .models import page_resource_list

class PageResourceListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = page_resource_list
        fields = ['MODEL','CULTURE','SHORT_LABEL','PARENT','ICON','TITLE','URL']

class PageResourceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = page_resource_list
        fields = '__all__'

    def create(self, validated_data):
        validated_data['ROW_ID'] = uuid.uuid4().hex
        psl = page_resource_list.objects.create(**validated_data)
        psl.save()
        return psl
