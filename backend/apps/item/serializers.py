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


class ItemsSaveSerializer(serializers.Serializer):
    def create_item(self, validated_data):
        items = validated_data.data.get("ITEM")
        items["START_DATETIME"] = datetime.now().strftime("%Y-%m-%d")
        items["LAST_UPDT_USER"] = str(validated_data.user)
        validate_model_not_null(items, "ITEM", validated_data)
        items["VERSION"] = uuid.uuid4().hex
        item_obj = item.objects.create(**items)
        item_obj.save()
        return "Created successfully"

    def update_item(self, validated_data):
        items = validated_data.data.get("ITEM")
        itemId = items.get("ITEM_ID")
        is_available = item.objects.filter(ITEM_ID=itemId)
        if is_available:
            is_available.update(**items)
            return "Updated successfully"
        else:
            return "Item with ID {} does not exist".format(itemId)

    def save(self, validated_data):
        if validated_data.instance is not None:
            # perform update operation
            return self.update_item(validated_data)
        else:
            # perform create operation
            return self.create_item(validated_data)
