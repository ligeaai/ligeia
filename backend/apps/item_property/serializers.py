import uuid

from rest_framework import serializers

from .models import item_property


class ItemPropertySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = '__all__'

    def create(self, validated_data):
            validated_data['VERSION'] = uuid.uuid4().hex
            validated_data['ROW_ID'] = uuid.uuid4().hex
            types = item_property.objects.create(**validated_data)
            types.save()
            return types

class ItemPropertyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = '__all__'


