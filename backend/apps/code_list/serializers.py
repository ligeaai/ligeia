from rest_framework import serializers
from .models import code_list
import uuid

class CodeListSaveScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = '__all__'
    def save(self, **kwargs):
        print('GİRDİ')
        return True
 
class CodeListSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = '__all__'


class CodeListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = ['LIST_TYPE','CULTURE','CODE','CODE_TEXT']

class CodeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = '__all__'

class codeListNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = ['LIST_TYPE','CULTURE','CODE','CODE_TEXT']