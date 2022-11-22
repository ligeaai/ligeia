import uuid

from rest_framework import serializers
from utils.models_utils import (
                                validate_model_not_null,
                                validate_value)
from rest_framework.exceptions import ValidationError 
from .models import tags
from services.logging.Handlers import KafkaLogger 
logger = KafkaLogger()

class TagsSaveSerializer(serializers.Serializer):

    def save(self, validated_data): # validated data = requst
        data = validated_data.data
        qs = tags.objects.filter(TAG_ID = data.get('TAG_ID'))
        if qs:
            qs.update(**data)
        else:
            validate_model_not_null(data,'tags',validated_data)
            tagss = tags.objects.create(**data)
            tagss.save()
        return 'Succsessful'
        # return super().create(validated_data)

class TagsDetiailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = tags
        fields = '__all__'
    
class TagsFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = tags
        fields = '__all__'
