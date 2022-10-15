import uuid

from rest_framework import serializers

from .models import type as Type


class TypeSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'

    def create(self, validated_data):
            validated_data['VERSION'] = uuid.uuid4().hex
            validated_data['ROW_ID'] = uuid.uuid4().hex
            types = Type.objects.create(**validated_data)
            types.save()
            return types

class TypeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'



class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['TYPE','BASE_TYPE',]