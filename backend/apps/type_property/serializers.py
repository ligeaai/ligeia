import uuid

from rest_framework import serializers

from .models import type_property


class TypePropertySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_property
        fields = "__all__"


class TypePropertyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_property
        fields = "__all__"


class TypePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = type_property
        fields = [
            "TYPE",
            "PROPERTY_NAME",
            "CODE_LIST",
            "MANDATORY",
            "LABEL_ID",
            "PROP_GRP",
            "PROPERTY_TYPE",
            "SORT_ORDER",
        ]


class TypePropertyCustomSaveSerializer(serializers.Serializer):
    def create(self, validated_data):
        validated_data["VERSION"] = uuid.uuid4().hex
        validated_data["ROW_ID"] = uuid.uuid4().hex
        type_properyes = type_property.objects.create(**validated_data)
        type_properyes.save()
        return type_properyes
