import uuid
from apps.layer.helpers import updateDB
from rest_framework import serializers
from .models import layer

# from .helpers import updateDB


class LayerDropDownSerializer(serializers.ModelSerializer):
    class Meta:
        model = layer
        fields = [
            "LAYER_NAME",
        ]


class LayerSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = layer
        fields = "__all__"

    def create(self, validated_data):
        layers = layer.objects.create(**validated_data)
        layers.save()
        return layers

    def update(self, validated_data):
        layers = layer.objects.filter(ROW_ID=validated_data.get("ROW_ID")).values(
            "LAYER_NAME"
        )
        if layers:
            if validated_data.get("LAYER_NAME") != layers[0].get("LAYER_NAME"):
                print("GİRDİ")
                updateDB(layers[0].get("LAYER_NAME"), validated_data.get("LAYER_NAME"))
            layers.update(**validated_data)

        return layers
