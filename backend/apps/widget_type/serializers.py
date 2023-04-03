import uuid
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import widget_type
from datetime import datetime


class Widget_TypeSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = widget_type
        fields = "__all__"

    def save(self, validated_data):
        try:
            widget_types = validated_data.get("WIDGET_TYPE")
            qs = widget_type.objects.filter(WIDGET_TYPE=widget_types)
            if qs.exists():
                instance = super().update(qs.first(), validated_data)
            else:
                instance = super().create(validated_data)
                instance.save()
            return instance
        except Exception as e:
            raise ValidationError(str(e))
