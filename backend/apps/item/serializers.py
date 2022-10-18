import uuid

from rest_framework import serializers

from .models import item


class ItemSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = item
        fields = '__all__'

    def create(self, validated_data):
            validated_data['VERSION'] = uuid.uuid4().hex
            validated_data['ROW_ID'] = uuid.uuid4().hex
            types = item.objects.create(**validated_data)
            types.save()
            return types

class ItemDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item
        fields = '__all__'


