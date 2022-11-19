import uuid
from rest_framework import serializers
from .models import layer

class LayerDropDownSerializer(serializers.ModelSerializer):
    class Meta:
        model = layer
        fields = ['LAYER_NAME',]

class LayerSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = layer
        fields = '__all__'

    def create(self, validated_data):
        
        layers = layer.objects.create(**validated_data)
        layers.save()
        return layers
    
