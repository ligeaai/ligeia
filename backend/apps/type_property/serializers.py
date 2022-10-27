import uuid

from rest_framework import serializers

from .models import type_property
from utils.models_utils import (
                                validate_model_not_null,
                                validate_value)
from rest_framework.exceptions import ValidationError 

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
    def save(self, validated_data):
        qs = type_property.objects.filter(ROW_ID = validated_data.get('ROW_ID'))
        if qs:
            try:
                validate_value(validated_data,'TYPE_PROPERTY')
                qs.update(**validated_data)
            except Exception as e:
                raise ValidationError(e)
        else: 
            try:
                validate_model_not_null(validated_data,"TYPE_PROPERTY")
                validated_data["VERSION"] = uuid.uuid4().hex
                codeList = type_property.objects.create(**validated_data)
                codeList.save()
                return codeList
            except Exception as e:
                raise ValidationError(e)
    
    
    
    
    
    # def save(self, validated_data):
    #     validated_data["VERSION"] = uuid.uuid4().hex
    #     validated_data["ROW_ID"] = uuid.uuid4().hex
    #     type_properyes = type_property.objects.create(**validated_data)
    #     type_properyes.save()
    #     return type_properyes
