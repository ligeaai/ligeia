from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import widget_property
from .serializers import Widget_PropertySaveSerializer
import uuid
from rest_framework.response import Response

# Create your views here.
class WidgetPropertySaveView(generics.CreateAPIView):
    serializer_class = Widget_PropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = Widget_PropertySaveSerializer(data=request.data)
        if serializer.is_valid():
            widget_prop = serializer.save()
            message = Widget_PropertySaveSerializer(widget_prop).data
            return Response(message, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
