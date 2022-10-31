from rest_framework import serializers
from .models import code_list
import uuid
from utils.models_utils import (
                                validate_model_not_null,
                                validate_value)
from rest_framework.exceptions import ValidationError 

from services.logging.Handlers import KafkaLogger 
logger = KafkaLogger()

class CodeListSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"
    
    def save(self, validated_data):
        try:
            validated_data["VERSION"] = uuid.uuid4().hex
            codeList = code_list.objects.create(**validated_data)
            codeList.save()
            return True
        except Exception as e:
            raise ValidationError(e)


class CodeListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"


class CodeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"
    

class CodeListDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = ['ROW_ID']


class codeListNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = ["LIST_TYPE", "CULTURE", "CODE", "CODE_TEXT"]


class CodeListCustomNewSerializer(serializers.Serializer):
    def save(self, validated_data):
        data = validated_data.data.get('CODE_LIST')
        for item in data:
            qs = code_list.objects.filter(ROW_ID = item.get('ROW_ID'))
            if qs:
                try:
                    validate_value(item,"CODE_LIST",validated_data)
                    qs.update(**item)
                except Exception as e:
                    logger.error('Update Failed',validated_data,e,'FAULTS')
                    raise ValidationError(e)
            else: 
                validate_model_not_null(item,"code_list",validated_data) 
                item["VERSION"] = uuid.uuid4().hex
                codeList = code_list.objects.create(**item)
                codeList.save()
        
        return str(codeList) + "Code list Created and updated successful"
    
class CodeListCustomSerializer(serializers.Serializer):

    def save(self, validated_data):
        qs = code_list.objects.filter(ROW_ID = validated_data.data.get('ROW_ID'))
        if qs:
            try:
                validate_value(validated_data.data,"CODE_LIST",validated_data)
                qs.update(**validated_data.data)
                return "Code list update successful"
            except Exception as e:
                logger.error('Update Failed',validated_data,e,'FAULTS')
                raise ValidationError(e)
        else: 
            validate_model_not_null(validated_data.data,"code_list",validated_data) 
            validated_data.data["VERSION"] = uuid.uuid4().hex
            codeList = code_list.objects.create(**validated_data.data)
            codeList.save()
            return str(codeList) + "Code list Created successful"
        