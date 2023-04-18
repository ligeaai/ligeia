import uuid
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import widget_property
from datetime import datetime


class Widget_PropertyGetSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 1
        model = widget_property
        fields = (
            "WIDGET_ID",
            "PROPERTY_NAME",
            "PROPERTY_STRING",
            "PROPERTY_TAG",
            "PROPERTY_JSON",
            "PROPERTY_BOOLEAN",
        )


class Widget_PropertySaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = widget_property
        fields = "__all__"

    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=raise_exception)
        return True

    def save(self, validated_data):
        try:
            validated_data["START_DATETIME"] = "2023-03-25"
            validated_data["END_DATETIME"] = "9000-01-01"
            row_id = validated_data.get("ROW_ID")
            qs = widget_property.objects.filter(ROW_ID=row_id)
            if qs.exists():
                instance = super().update(qs.first(), validated_data)
            else:
                instance = super().create(validated_data)
                instance.save()
            return instance
        except Exception as e:
            print(validated_data.get("PROPERTY_STRING"))
            raise ValidationError(str(e))


class Widget_PropertyUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = widget_property
        fields = "__all__"

    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=raise_exception)
        return True

    def save(self, validated_data):
        try:
            widgetId = validated_data.get("WIDGET_ID")
            propertyName = validated_data.get("PROPERTY_NAME")
            qs = widget_property.objects.filter(
                WIDGET_ID=widgetId, PROPERTY_NAME=propertyName
            )
            if qs.exists():
                instance = super().update(qs.first(), validated_data)
            else:
                validated_data["START_DATETIME"] = "2023-03-25"
                validated_data["END_DATETIME"] = "9000-01-01"
                validated_data["ROW_ID"] = uuid.uuid4().hex
                instance = super().create(validated_data)
                instance.save()
            return instance
        except Exception as e:
            print(validated_data.get("PROPERTY_STRING"))
            raise ValidationError(str(e))
