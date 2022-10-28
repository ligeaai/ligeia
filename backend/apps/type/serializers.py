import uuid

from rest_framework import serializers
from utils.models_utils import (
                                validate_model_not_null,
                                validate_value)
from rest_framework.exceptions import ValidationError 
from .models import type as Type


class TypeSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

    def create(self, validated_data):
            validated_data['VERSION'] = uuid.uuid4().hex
            types = Type.objects.create(**validated_data)
            types.save()
            return types

class TypeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'



class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['TYPE','BASE_TYPE',]

class TypeCustomSaveSerializer(serializers.Serializer):
    def save(self, validated_data):
        qs = Type.objects.filter(TYPE = validated_data.get('TYPE'))
        if qs:
            try:
                validate_value(validated_data,'TYPE')
                qs.update(**validated_data)
            except Exception as e:
                raise ValidationError(e)
        else: 
            try:
                validate_model_not_null(validated_data,"TYPE") 
                validated_data["VERSION"] = uuid.uuid4().hex
                codeList = Type.objects.create(**validated_data)
                codeList.save()
                return codeList
            except Exception as e:
                raise ValidationError(e)
                
            
    
    
    
    # def save(self, validated_data):
        
    #     validated_data['VERSION'] = uuid.uuid4().hex
    #     validated_data['ROW_ID'] = uuid.uuid4().hex
    #     types = Type.objects.create(**validated_data)
    #     types.save()
    #     return types