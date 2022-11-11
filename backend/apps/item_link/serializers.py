from rest_framework import serializers
from .models import item_link
from utils.models_utils import validate_model_not_null
import uuid

class ItemLinkSaveSerializer(serializers.Serializer):
    def save(self, validated_data):
        item = item_link.objects.filter(LINK_ID = validated_data.data.get('LINK_ID'))
        if item:
            item.update(**validated_data.data)
        else:
            validated_data.data['VERSION'] = uuid.uuid4().hex
            validated_data.data['UPDATE_SOURCE'] = "x"
            validated_data.data['CREATE_SOURCE'] = "x"
            validate_model_not_null(validated_data.data,"ITEM_LINK",request = validated_data)
            items = item_link.objects.create(**validated_data.data)
            items.save()
        return "Succsessful"


class ItemLinkDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_link
        fields = ["LINK_ID","LINK_TYPE","FROM_ITEM_ID","FROM_ITEM_TYPE","TO_ITEM_ID","TO_ITEM_TYPE"]
