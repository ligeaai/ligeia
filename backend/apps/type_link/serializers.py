import uuid

from rest_framework import serializers

from .models import type_link


class TypeLinkSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_link
        fields = '__all__'

        
class TypeLinkDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_link
        fields = ['TYPE','FROM_TYPE','FROM_CARDINALITY','TO_TYPE','TO_CARDINALITY',]


