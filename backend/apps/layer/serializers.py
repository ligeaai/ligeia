import uuid

from rest_framework import serializers

from .models import layer


class LayerSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = layer
        fields = '__all__'