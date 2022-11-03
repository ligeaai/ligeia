from datetime import datetime
import uuid

from rest_framework import serializers

from .models import item_property


class ItemPropertySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = "__all__"

    def create(self, validated_data):
        validated_data["VERSION"] = uuid.uuid4().hex
        validated_data["ROW_ID"] = uuid.uuid4().hex
        types = item_property.objects.create(**validated_data)
        types.save()
        return types


class ItemPropertyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = "__all__"


class ItemPropertyCustomSaveSerializer(serializers.Serializer):
    def create(self, validated_data):
        type_of_value = {
            "TEXT":"PROPERTY_STRING",
            "NUMBER":"PROPERTY_VALUE",
            "INT":"PROPERTY_VALUE",
            "BOOL":"PROPERTY_STRING",
            "CODE":"PROPERTY_CODE",
            "BLOB_ID":"PROPERTY_BINARY",
        }
        temptDict = validated_data.get('PROPERTY')
        return_dict2 = dict()
        for keys,value in temptDict.items():
            return_dict = dict()
            return_dict['ITEM_ID'] = validated_data.get('ITEM').get('ITEM_ID')
            return_dict['ITEM_TYPE'] = validated_data.get('ITEM').get('ITEM_TYPE')
            return_dict['START_DATETIME'] = validated_data.get('ITEM').get('START_DATETIME')
            return_dict['LAST_UPDT_USER'] = validated_data.get('ITEM').get('LAST_UPDT_USER')
            return_dict['PROPERTY_TYPE'] = value.get('VALUE_TYPE')
            typeValue = type_of_value.get(value.get('VALUE_TYPE'))
            return_dict[typeValue] = value.get('VALUE')
            return_dict['LAST_UPDT_DATE'] = str(datetime.now()).split(" ")[0]
            return_dict['START_DATETIME'] = str(datetime.now()).split(" ")[0]
            return_dict['END_DATETIME'] = str(datetime.now()).split(" ")[0]  
            return_dict['ROW_ID']  = uuid.uuid4().hex
            return_dict['VERSION'] = uuid.uuid4().hex
            return_dict['END_DATETIME'] = '9000-01-01'
            return_dict['UPDATE_SOURCE'] = "x"
            return_dict['CREATE_SOURCE'] = "x"
            
            item_propertys = item_property.objects.create(**return_dict)
            item_propertys.save()
            return_dict2[keys] = return_dict
        return return_dict2
    

