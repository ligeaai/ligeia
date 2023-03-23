import uuid
from datetime import datetime
from rest_framework import serializers

from .models import resource_list


class ResourceListSaveSerializer(serializers.Serializer):
    def create(self, validated_data):
        validated_data["VERSION"] = uuid.uuid4().hex
        validated_data["ROW_ID"] = uuid.uuid4().hex
        ResourceList = resource_list.objects.create(**validated_data)
        ResourceList.save()
        return ResourceList


class ResourceListTypeSerializer(serializers.Serializer):
    def save(self, validated_data):
        resource_dict = dict()
        types = validated_data.data.get("TYPE")
        resource_dict["ID"] = "TYPE." + str(types.get("TYPE"))
        label = list(str(types.get("TYPE")).lower())
        label[0] = str(label[0]).upper()
        resource_dict["SHORT_LABEL"] = str().join(label)
        resource_dict["LAYER_NAME"] = types.get("LAYER_NAME")
        resource_dict["LAST_UPDT_DATE"] = str(datetime.now()).split(" ")[0]
        resource_dict["LAST_UPDT_USER"] = str(validated_data.user)
        resource_dict["VERSION"] = uuid.uuid4().hex
        resource_dict["ROW_ID"] = uuid.uuid4().hex
        resource_dict["CULTURE"] = validated_data.data.get("CULTURE")
        qs = resource_list.objects.filter(
            ID=resource_dict["ID"],
            SHORT_LABEL=resource_dict.get("SHORT_LABEL"),
            CULTURE=resource_dict["CULTURE"],
        )
        if qs:
            qs.update(**resource_dict)
        else:
            rs_list = resource_list.objects.create(**resource_dict)
            rs_list.save()
        return resource_list


class ResourceListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = "__all__"


class ResourceListParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = ["PARENT"]


class ResourceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = ["CULTURE", "SHORT_LABEL", "MOBILE_LABEL"]


class ResourceListLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = ["SHORT_LABEL", "MOBILE_LABEL"]
