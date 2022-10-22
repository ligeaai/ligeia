import uuid

from rest_framework import serializers
from datetime import datetime
from .models import item


class ItemSaveSerializer(serializers.Serializer):
    class Meta:
        model = item
        fields = "__all__"

    # def save(self, validated_data):
    #         print('GİRDİ')
    #         # validated_data['VERSION'] = uuid.uuid4().hex
    #         # validated_data['ROW_ID'] = uuid.uuid4().hex
    #
    #         return True


class ItemCustomSaveSerializer(serializers.Serializer):
    def create(self, validated_data):
<<<<<<< Updated upstream
        validated_data["ITEM_ID"] = uuid.uuid4().hex
        validated_data["LAST_UPDT_DATE"] = str(datetime.now()).split(" ")[0]
        validated_data["ROW_ID"] = uuid.uuid4().hex
        validated_data["VERSION"] = uuid.uuid4().hex
        validated_data["UPDATE_SOURCE"] = "x"
        validated_data["CREATE_SOURCE"] = "x"
=======
        validated_data['END_DATETIME'] = '9000-01-01'
        validated_data['LAST_UPDT_DATE'] = str(datetime.now()).split(" ")[0]
        validated_data['ROW_ID']  = uuid.uuid4().hex
        validated_data['VERSION'] = uuid.uuid4().hex
        validated_data['DB_ID'] = uuid.uuid4().hex
        validated_data['UPDATE_SOURCE'] = "x"
        validated_data['CREATE_SOURCE'] = "x"
>>>>>>> Stashed changes
        items = item.objects.create(**validated_data)
        items.save()

        return items


class ItemDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item
        fields = "__all__"
