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
    def save(self, validated_data):
        # ITEM_ID OR ROW_ID
        queryset = item.objects.filter(ITEM_ID = validated_data['ITEM_ID'])
        if queryset:
            queryset.update(**validated_data)
            return "Update ıtem"
        else:
            validated_data['END_DATETIME'] = '9000-01-01'
            validated_data['LAST_UPDT_DATE'] = str(datetime.now()).split(" ")[0]
            validated_data['VERSION'] = uuid.uuid4().hex
            # validated_data['ROW_ID'] = uuid.uuid4().hex
            validated_data['UPDATE_SOURCE'] = "x"
            validated_data['CREATE_SOURCE'] = "x"
            items = item.objects.create(**validated_data)
            items.save()

            return "Created Item"


class ItemDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item
        fields =["ITEM_ID","ITEM_TYPE","ROW_ID"]
