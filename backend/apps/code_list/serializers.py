from rest_framework import serializers
from .models import code_list
import uuid
from utils.models_utils import (
                                validate_model_not_null,
                                validate_value)
from rest_framework.exceptions import ValidationError 



class CodeListSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"


class CodeListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"


class CodeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"


class codeListNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = ["LIST_TYPE", "CULTURE", "CODE", "CODE_TEXT"]


class CodeListCustomSerializer(serializers.Serializer):

    def save(self, validated_data):
        qs = code_list.objects.filter(ROW_ID = validated_data.get('ROW_ID'))
        if qs:
            try:
                
                validate_value(validated_data,"CODE_LIST")
                qs.update(**validated_data)
            except Exception as e:
                raise ValidationError(e)
        else: 
            validate_model_not_null(validated_data,"code_list") 
            validated_data["VERSION"] = uuid.uuid4().hex
            codeList = code_list.objects.create(**validated_data)
            codeList.save()
            return codeList
        