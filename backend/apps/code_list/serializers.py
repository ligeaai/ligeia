from rest_framework import serializers
from .models import code_list
import uuid

class CodeListSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = '__all__'

    # def create(self, validated_data):
    #         validated_data['VERSION'] = uuid.uuid4().hex
    #         validated_data['ROW_ID'] = uuid.uuid4().hex
    #         user = Type.objects.create(**validated_data)
    #         user.save()
    #         return user

class CodeListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = '__all__'

class CodeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = '__all__'

class codeListNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = ['LIST_TYPE','CULTURE','CODE','CODE_TEXT']