import uuid
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Widget


class WidgetSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = "__all__"

    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=raise_exception)
        return True

    def save(self, validated_data):
        try:
            print(validated_data)
            widget_id = validated_data.get("WIDGET_ID")
            qs = Widget.objects.filter(WIDGET_ID=widget_id)
            print(qs)
            if qs.exists():
                instance = super().update(qs.first(), validated_data)
            else:
                instance = super().create(validated_data)
            return instance
        except Exception as e:
            raise ValidationError(str(e))
