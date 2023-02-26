from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Layout
from .serializers import LayoutsSerializer
import uuid
from rest_framework.response import Response

# Create your views here.
class LayoutsSaveView(generics.CreateAPIView):
    serializer_class = LayoutsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LayoutsSerializer(data=request.data)
        if serializer.is_valid():
            layout = serializer.save()
            message = LayoutsSerializer(layout).data
            return Response(message, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
