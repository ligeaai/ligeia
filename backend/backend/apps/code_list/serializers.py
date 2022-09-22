from dataclasses import fields
from pyexpat import model
from rest_framework import serializers

from .models import code_list


class CodeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = code_list
        fields = "__all__"
