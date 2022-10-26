import uuid

from rest_framework import serializers

from .models import resource_list


class ResourceListSaveSerializer(serializers.Serializer):

    def create(self, validated_data):
            validated_data['VERSION'] = uuid.uuid4().hex
            validated_data['ROW_ID'] = uuid.uuid4().hex
            ResourceList = resource_list.objects.create(**validated_data)
            ResourceList.save()
            return ResourceList


class ResourceListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = "__all__"


class ResourceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = resource_list
        fields = ["CULTURE", "SHORT_LABEL"]
