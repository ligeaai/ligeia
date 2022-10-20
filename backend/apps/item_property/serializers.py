from datetime import datetime
import uuid

from rest_framework import serializers

from .models import item_property


class ItemPropertySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = '__all__'

    def create(self, validated_data):
            validated_data['VERSION'] = uuid.uuid4().hex
            validated_data['ROW_ID'] = uuid.uuid4().hex
            types = item_property.objects.create(**validated_data)
            types.save()
            return types

class ItemPropertyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = '__all__'


class ItemPropertyCustomSaveSerializer(serializers.Serializer):

    def create(self, validated_data):
        valueTypeDict = {
         "TEXT":"PROPERTY_STRING",
         "BOOL":"PROPERTY_STRING",
         "CODE":"PROPERTY_STRING",
         "DATE":"PROPERTY_DATE",
         "INT":"PROPERTY_VALUE",
         "NUMBER":"PROPERTY_VALUE"
        }
        property_name = validated_data.get('PROPERTY_NAME')
        return_dict = dict()
        for keys,value in validated_data.items():
            temptDict = dict()
            temptDict['ITEM_TYPE'] = property_name
            if value is not None and value != property_name:
                if value.get('VALUE') is not None :
                    print(value.get('VALUE_TYPE'))
                    temptDict['ITEM_ID'] = uuid.uuid4().hex
                    temptDict['PROPERTY_TYPE'] = value.get('VALUE_TYPE')
                    temptDict['LAST_UPDT_DATE'] = str(datetime.now()).split(" ")[0]
                    temptDict['START_DATETIME'] = str(datetime.now()).split(" ")[0]
                    temptDict['END_DATETIME'] = str(datetime.now()).split(" ")[0]  
                    temptDict['ROW_ID']  = uuid.uuid4().hex
                    temptDict['VERSION'] = uuid.uuid4().hex
                    temptDict['UPDATE_SOURCE'] = "x"
                    temptDict['CREATE_SOURCE'] = "x"
                    temptDict[valueTypeDict.get(value.get('VALUE_TYPE'))] = value.get('VALUE')
                    itemProperty = item_property.objects.create(**temptDict)
                    itemProperty.save()
                    return_dict[keys]=temptDict

        return return_dict
    

