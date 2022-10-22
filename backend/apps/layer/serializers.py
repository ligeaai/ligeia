import uuid
from rest_framework import serializers
from .models import layer


class LayerSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = layer
        fields = '__all__'

    def create(self, validated_data):
        validated_data['VERSION'] = uuid.uuid4().hex
        validated_data['ROW_ID'] = uuid.uuid4().hex
        layers = layer.objects.create(**validated_data)
        layers.save()
        return layers
    
