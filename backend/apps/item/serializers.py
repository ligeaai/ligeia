import uuid

from rest_framework import serializers
from datetime import datetime
from .models import item
from utils.models_utils import validate_model_not_null


class ItemSaveSerializer(serializers.Serializer):
    class Meta:
        model = item
        fields = "__all__"


class ItemDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item
        fields = ["ITEM_ID"]


class ItemSpacialSaveSerializer(serializers.Serializer):
    def save(self, validated_data):
        message = " Succsesful"
        items = validated_data.data.get("ITEM")
        itemId = items.get("ITEM_ID")
        isAvailable = item.objects.filter(ITEM_ID=itemId)
        if isAvailable:
            isAvailable.update(**items)
            message = "Update" + message
        else:
            items["START_DATETIME"] = datetime.now().strftime("%Y-%m-%d")
            items["LAST_UPDT_USER"] = str(validated_data.user)
            validate_model_not_null(items, "ITEM", validated_data)
            items["VERSION"] = uuid.uuid4().hex
            property = item.objects.create(**items)
            property.save()
            message = "Save" + message

        return message
