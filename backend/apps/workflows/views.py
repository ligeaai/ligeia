from django.shortcuts import render
from utils.models_utils import validate_find
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import workflows
from .serializers import WorkflowsSerializers



class UomUnitSaveView(generics.CreateAPIView):

    serializer_class = WorkflowsSerializers
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            workflow = serializer.save()
            return Response(
                workflow
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
