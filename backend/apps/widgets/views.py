from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Widget
from .serializers import WidgetSaveSerializer
import uuid
from rest_framework.response import Response

# Create your views here.
class WidgetSaveView(generics.CreateAPIView):
    serializer_class = WidgetSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = WidgetSaveSerializer(data=request.data)
        if serializer.is_valid():
            widget_prop = serializer.save(request.data)
            message = WidgetSaveSerializer(widget_prop).data
            return Response(message, status=status.HTTP_201_CREATED)
        else:
            print("GİRDİ")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
