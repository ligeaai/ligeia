from rest_framework import serializers
from .models import uom_base_unit
from apps.uoms.serializers import UomQuantitySerializer

class UomUnitDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = uom_base_unit
        fields = '__all__'

class UomUnitQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = uom_base_unit
        fields = ['QUANTITY_TYPE']
