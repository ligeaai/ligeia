from rest_framework import serializers
from .models import uom

class UomDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = uom
        fields = '__all__'