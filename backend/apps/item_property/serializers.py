from datetime import datetime
import uuid
from django.db.models import Q
from rest_framework import serializers
from apps.item.models import item
from apps.item.serializers import ItemCustomSaveSerializer
from .models import item_property
from utils.models_utils import (
                                validate_model_not_null,
                                validate_find,
                                )


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

class ItemPropertyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = ["PROPERTY_VALUE","PROPERTY_DATE","PROPERTY_STRING","PROPERTY_CODE","PROPERTY_BINARY"]


class ItemPropertyUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = ["START_DATETIME","END_DATETIME"]


class ItemPropertyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = item_property
        fields = ["ITEM_TYPE","PROPERTY_TYPE","PROPERTY_INFO","PROPERTY_VALUE","PROPERTY_DATE","PROPERTY_STRING","PROPERTY_CODE","PROPERTY_BINARY","ROW_ID","START_DATETIME","END_DATETIME"]


class ItemPropertyCustomSaveSerializer(serializers.Serializer):
    
    def _validated_prop_uniq(self,tempt_data,index,type_of_value,item_id):
        try:
            for keys in tempt_data[index].keys():
                condition_value =tempt_data[index].get(keys).get('VALUE')
                if (condition_value == "" or condition_value == None ):
                    continue
                typeValue = type_of_value.get(tempt_data[index].get(keys).get('VALUE_TYPE'))
                if tempt_data[index].get(keys).get('UNICODE') == "True":
                    value = tempt_data[index].get(keys).get('VALUE')
                    qs_uniqe = item_property.objects.filter(Q(PROPERTY_TYPE = keys) & Q(**{typeValue:value}) & ~Q(ITEM_ID = item_id))
                    if qs_uniqe:
                        msg = (str(keys) + " must be unique")
                        raise serializers.ValidationError(msg, code="authorization")
                    
        except BaseException as e:
            raise serializers.ValidationError({"Message":e}, code="authorization")

    def save(self, validated_data):
        item_id = validated_data.data.get('ITEM').get('ITEM_ID')
        type_of_value = {
            "TEXT":"PROPERTY_STRING",
            "NUMBER":"PROPERTY_VALUE",
            "INT":"PROPERTY_VALUE",
            "BOOL":"PROPERTY_STRING",
            "CODE":"PROPERTY_CODE",
            "BLOB_ID":"PROPERTY_BINARY",
            "PERCENT":"PROPERTY_VALUE",
            "DATE":"PROPERTY_DATE"
        }
        item_data = validated_data.data.get('ITEM')
        tempt_data = validated_data.data.get('COLUMNS')
        user = item_data.get('LAST_UPDT_USER')
        for index in range(0,len(tempt_data)):
            try:
                end_time =  tempt_data[index+1].get('START_TIME')
            except:
                end_time = '9000-01-01'
            time = tempt_data[index].get('START_TIME')
            tempt_data[index].pop("START_TIME")
            tempt_keys = tempt_data[index].keys()

            self._validated_prop_uniq(tempt_data,index,type_of_value,item_id)
            try:
                queryset = item.objects.filter(ITEM_ID = item_id).delete()
                queryset = item_property.objects.filter(ITEM_ID = item_id).delete()
                for keys in tempt_keys:
                    condition_value =tempt_data[index].get(keys).get('VALUE')
                    if (condition_value == "" or condition_value == None ):
                        continue
                    typeValue = type_of_value.get(tempt_data[index].get(keys).get('VALUE_TYPE'))
                    if tempt_data[index].get(keys).get('UNICODE') == "True":
                        value = tempt_data[index].get(keys).get('VALUE')
                        qs_uniqe = item_property.objects.filter(Q(PROPERTY_TYPE = keys) & Q(**{typeValue:value}) & ~Q(ITEM_ID = item_id))

                        if qs_uniqe:
                            msg = (str(keys) + " must be unique")
                            raise serializers.ValidationError(msg, code="authorization")
                    tempt_data[index].get(keys).pop('UNICODE')
                    tempt_data[index].get(keys)['START_DATETIME'] = time
                    tempt_data[index].get(keys)['ITEM_ID'] = item_data.get('ITEM_ID')
                    tempt_data[index].get(keys)['ITEM_TYPE'] = item_data.get('ITEM_TYPE')
                    tempt_data[index].get(keys)['CREATE_SOURCE'] = "x"
                    tempt_data[index].get(keys)['UPDATE_SOURCE'] = "x"
                    tempt_data[index].get(keys)['LAST_UPDT_USER'] = user
                    tempt_data[index].get(keys)['LAST_UPDT_DATE'] = str(datetime.now()).split(" ")[0]
                    tempt_data[index].get(keys)['VERSION'] = uuid.uuid4().hex
                    tempt_data[index].get(keys)['END_DATETIME'] = end_time
                    tempt_data[index].get(keys)['PROPERTY_TYPE'] = keys
                    tempt_data[index].get(keys)['PROPERTY_INFO'] = tempt_data[index].get(keys).get('VALUE_TYPE')
                    tempt_data[index].get(keys)[typeValue] = tempt_data[index].get(keys).get('VALUE')
                    tempt_data[index].get(keys).pop('VALUE_TYPE')
                    tempt_data[index].get(keys).pop('VALUE')
                    item_propertys = item_property.objects.create(**tempt_data[index].get(keys))
                    item_data = validated_data.data['ITEM']
                    item_data['START_DATETIME'] = time
                    validate_model_not_null(item_data,"item",validated_data)
                    serializer = ItemCustomSaveSerializer(data = item_data)
                    serializer.is_valid()
                    serializer.save(item_data)
                    item_propertys.save()
            except Exception as e:
                raise serializers.ValidationError({"Message":e}, code="authorization")
        return tempt_data










#   type_of_value = {
#             "TEXT":"PROPERTY_STRING",
#             "NUMBER":"PROPERTY_VALUE",
#             "INT":"PROPERTY_VALUE",
#             "BOOL":"PROPERTY_STRING",
#             "CODE":"PROPERTY_CODE",
#             "BLOB_ID":"PROPERTY_BINARY",
#         }
#         temptDict = validated_data.get('PROPERTY')
#         return_dict2 = dict()
#         for keys,value in temptDict.items():
#             queryset = item_property.objects.filter(ROW_ID = value.get('ROW_ID'))
#             if queryset:
#                 serializers = ItemPropertyUpdateSerializer(queryset,many = True)
#                 tempt = serializers.data[0].get("START_DATETIME")
#                 serializers.data[0]["START_DATETIME"] = serializers.data[0].get('END_DATETIME')
#                 serializers.data[0]["END_DATETIME"] = tempt
#                 queryset.update(**serializers.data[0])
            
#             return_dict = dict()
#             return_dict['ITEM_ID'] = validated_data.get('ITEM').get('ITEM_ID')
#             #validated_data.get('ITEM').get('ITEM_TYPE')
#             return_dict['ITEM_TYPE'] = validated_data.get('ITEM').get('ITEM_TYPE')
#             return_dict['START_DATETIME'] = validated_data.get('ITEM').get('START_DATETIME')
#             return_dict['LAST_UPDT_USER'] = validated_data.get('ITEM').get('LAST_UPDT_USER')
#             # property_type value.get('VALUE_TYPE') or keys
#             return_dict['PROPERTY_TYPE'] = keys
#             typeValue = type_of_value.get(value.get('VALUE_TYPE'))
#             return_dict['PROPERTY_INFO']= value.get('VALUE_TYPE')
#             return_dict[typeValue] = value.get('VALUE')
#             return_dict['LAST_UPDT_DATE'] = str(datetime.now()).split(" ")[0]
#             return_dict['START_DATETIME'] = str(datetime.now()).split(" ")[0]
#             return_dict['END_DATETIME'] = str(datetime.now()).split(" ")[0]  
#             return_dict['ROW_ID']  = uuid.uuid4().hex
#             return_dict['VERSION'] = uuid.uuid4().hex
#             return_dict['END_DATETIME'] = '9000-01-01'
#             return_dict['UPDATE_SOURCE'] = "x"
#             return_dict['CREATE_SOURCE'] = "x"
#             item_propertys = item_property.objects.create(**return_dict)
#             item_propertys.save()
#             return_dict2[keys] = return_dict
#         return return_dict2
                
    

