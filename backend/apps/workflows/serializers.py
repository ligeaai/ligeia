import uuid
from utils.models_utils import validate_model_not_null, validate_value
from rest_framework import serializers
from .models import workflows
from rest_framework.exceptions import ValidationError



class WorkflowsSerializers(serializers.ModelSerializer):
    class Meta:
        model = workflows
        fields = "__all__"