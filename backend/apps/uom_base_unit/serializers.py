from rest_framework import serializers
from .models import uom_base_unit

class UomUnitDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = uom_base_unit
        fields = '__all__'