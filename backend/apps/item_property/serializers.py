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
<<<<<<< Updated upstream
        valueTypeDict = {
            "TEXT": "PROPERTY_STRING",
            "BOOL": "PROPERTY_STRING",
            "CODE": "PROPERTY_STRING",
            "DATE": "PROPERTY_DATE",
            "INT": "PROPERTY_VALUE",
            "NUMBER": "PROPERTY_VALUE",
        }
        property_name = validated_data.get("PROPERTY_NAME")
        return_dict = dict()
        for keys, value in validated_data.items():
            temptDict = dict()
            temptDict["ITEM_TYPE"] = property_name
            if value is not None and value != property_name:
                if value.get("VALUE") is not None:
                    temptDict["ITEM_ID"] = uuid.uuid4().hex
                    temptDict["PROPERTY_TYPE"] = value.get("VALUE_TYPE")
                    temptDict["LAST_UPDT_DATE"] = str(datetime.now()).split(" ")[0]
                    temptDict["START_DATETIME"] = str(datetime.now()).split(" ")[0]
                    temptDict["END_DATETIME"] = str(datetime.now()).split(" ")[0]
                    temptDict["ROW_ID"] = uuid.uuid4().hex
                    temptDict["VERSION"] = uuid.uuid4().hex
                    temptDict["UPDATE_SOURCE"] = "x"
                    temptDict["CREATE_SOURCE"] = "x"
                    temptDict[valueTypeDict.get(value.get("VALUE_TYPE"))] = value.get(
                        "VALUE"
                    )
                    itemProperty = item_property.objects.create(**temptDict)
                    itemProperty.save()
                    return_dict[keys] = temptDict

        return return_dict
=======
        temptDict = validated_data.get('PROPERTY')
        return_dict2 = dict()
        for keys,value in temptDict.items():
            return_dict = dict()
            return_dict['ITEM_ID'] = validated_data.get('ITEM').get('ITEM_ID')
            return_dict['ITEM_TYPE'] = validated_data.get('ITEM').get('ITEM_TYPE')
            return_dict['START_DATETIME'] = validated_data.get('ITEM').get('START_DATETIME')
            return_dict['LAST_UPDT_USER'] = validated_data.get('ITEM').get('LAST_UPDT_USER')
            return_dict['PROPERTY_TYPE'] = keys
            return_dict[value.get('VALUE_TYPE')] = value.get('VALUE')
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
    

>>>>>>> Stashed changes
