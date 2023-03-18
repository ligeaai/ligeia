from datetime import datetime
import json
import uuid
from django.db.models import Q
from rest_framework import serializers
from apps.item.models import item
from rest_framework.exceptions import APIException
from .models import item_property
from utils.models_utils import (
    validate_model_not_null,
    validate_find,
)

type_of_value = {
    "TEXT": "PROPERTY_STRING",
    "NUMBER": "PROPERTY_VALUE",
    "INT": "PROPERTY_VALUE",
    "BOOL": "PROPERTY_STRING",
    "CODE": "PROPERTY_CODE",
    "BLOB_ID": "PROPERTY_BINARY",
    "PERCENT": "PROPERTY_VALUE",
    "DATE": "PROPERTY_DATE",
}


class ItemPropertySpacialSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = "__all__"

    def _validated_prop_uniq(self, data):
        value_info = data.get("PROPERTY_INFO")
        value_type = type_of_value.get(value_info)
        condition_value = data.get(value_type)
        if data.get("UNICODE") == "True":
            qs_uniqe = item_property.objects.filter(
                Q(PROPERTY_TYPE=data.get("PROPERTY_TYPE"))
                & Q(**{value_type: condition_value})
            ).exclude(ITEM_ID=data.get("ITEM_ID"))
            if qs_uniqe:
                msg = f"{data.get('PROPERTY_TYPE')} must be unique"
                raise APIException(msg, code=400)

    def save(self, validated_data):
        row_id = validated_data.get("ROW_ID")
        is_available = item_property.objects.filter(ROW_ID=row_id)
        self._validated_prop_uniq(validated_data)
        del validated_data["UNICODE"]
        if is_available:
            is_available.update(**validated_data)
            message = "Update successful"
        else:
            property = item_property.objects.create(**validated_data)
            message = "Save successful"
        return {"message": message}


class ItemPropertySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = "__all__"

    def create(self, validated_data):
        validated_data["VERSION"] = uuid.uuid4().hex
        validated_data["ROW_ID"] = uuid.uuid4().hex
        types = item_property.objects.create(**validated_data)
        types.save()
        return types


class ItemPropertyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = ["ITEM_ID", "PROPERTY_STRING", "ITEM_TYPE", "ROW_ID", "START_DATETIME"]


class ItemPropertyUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = ["START_DATETIME", "END_DATETIME"]


class ItemPropertyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = [
            "ITEM_TYPE",
            "PROPERTY_TYPE",
            "PROPERTY_INFO",
            "PROPERTY_VALUE",
            "PROPERTY_DATE",
            "PROPERTY_STRING",
            "PROPERTY_CODE",
            "PROPERTY_BINARY",
            "ROW_ID",
            "START_DATETIME",
            "END_DATETIME",
        ]
