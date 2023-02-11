import uuid
from utils.models_utils import validate_model_not_null, validate_value
from rest_framework import serializers
from .models import uom
from rest_framework.exceptions import ValidationError


class UomDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = uom
        fields = "__all__"


class UomQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = uom
        fields = ["QUANTITY_TYPE", "NAME", "CATALOG_SYMBOL"]


class UomSaveUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = uom
        exclude = ("VERSION", "ROW_ID", "DB_ID")

    def save(self, validated_data):
        request = validated_data
        validated_data = request.data
        qs = uom.objects.filter(ROW_ID=validated_data.get("ROW_ID"))
        if qs:
            try:
                validate_value(validated_data, "UOMS", request)
                qs.update(**validated_data)
                # logger.info("Type Property object successfully updated",request= request)
            except Exception as e:
                raise ValidationError(e)
        else:
            try:
                validate_model_not_null(validated_data, "UOMS", request)
                validated_data["VERSION"] = uuid.uuid4().hex
                validated_data["DB_ID"] = uuid.uuid4().hex
                typeProperty = uom.objects.create(**validated_data)
                typeProperty.save()
                # logger.info("Type Property object successfully created",request= request)
                return typeProperty
            except Exception as e:
                raise ValidationError(e)
