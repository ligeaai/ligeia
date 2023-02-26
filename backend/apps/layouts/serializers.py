import uuid
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Layout


class LayoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layout
        fields = "__all__"

    def save(self, **kwargs):
        try:
            validated_data = self.validated_data
            row_id = validated_data.get("ROW_ID")
            qs = Layout.objects.filter(ROW_ID=row_id)
            if qs.exists():
                instance = super().update(qs.first(), validated_data)
            else:
                instance = super().create(validated_data)
            return instance
        except Exception as e:
            raise ValidationError(str(e))


#
