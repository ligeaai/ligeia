from rest_framework import serializers
from .models import uom

class UomDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = uom
        fields = '__all__'


class UomQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = uom
        fields = ['QUANTITY_TYPE','NAME','CATALOG_SYMBOL']