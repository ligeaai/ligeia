import uuid

from rest_framework import serializers

from .models import type_link


class TypeLinkSaveSerializer(serializers.Serializer):
     def create(self, validated_data):
        validated_data["VERSION"] = uuid.uuid4().hex
        validated_data["ROW_ID"] = uuid.uuid4().hex
        type_links = type_link.objects.create(**validated_data)
        type_links.save()
        return type_links
        
class TypeLinkDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_link
        fields = ['TYPE','FROM_TYPE','FROM_CARDINALITY','TO_TYPE','TO_CARDINALITY',]


