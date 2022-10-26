from rest_framework import serializers
from .models import code_list
import uuid




class CodeListSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"


class CodeListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"


class CodeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"


class codeListNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = ["LIST_TYPE", "CULTURE", "CODE", "CODE_TEXT"]


class CodeListCustomSerializer(serializers.Serializer):
    def save(self, validated_data):
        qs = code_list.objects.filter(ROW_ID = validated_data.get('ROW_ID'))
        if qs:
            qs.update(**validated_data)
        else:
            validated_data["VERSION"] = uuid.uuid4().hex
            codeList = code_list.objects.create(**validated_data)
            codeList.save()
            return codeList
