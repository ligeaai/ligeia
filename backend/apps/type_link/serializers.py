import uuid

from rest_framework import serializers

from .models import type_link


class TypeLinkSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = type_link
        fields = '__all__'



