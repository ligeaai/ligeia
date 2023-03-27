import uuid
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Layout


class LayoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layout
        fields = "__all__"

    def is_valid(self, raise_exception=False):
        valid = super().is_valid(raise_exception=raise_exception)
        return True

    def save(self, validated_data):
        try:
            row_id = validated_data.get("ROW_ID")
            qs = Layout.objects.filter(ROW_ID=row_id)
            if qs.exists():
                instance = super().update(qs.first(), validated_data)
            else:
                instance = super().create(validated_data)
                instance.save()
            return instance
        except Exception as e:
            raise ValidationError(str(e))


#
