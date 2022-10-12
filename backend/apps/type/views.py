import re
from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import TypeSaveSerializer,TypeDetailsSerializer,TypeSerializer
# Create your views here.
from .models import type as Type
from services.parsers.addData.type import typeAddData


class TypeSaveView(generics.CreateAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TypeView(generics.ListAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        data = typeAddData.create_type_data()
        return Response({"Error":'error_message'}, status=status.HTTP_200_OK)


class TypeDetailView(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = [TypeSerializer,]
    def post(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        try:
            typeQuary = Type.objects.filter(TYPE=request.data.get('TYPE'))
            serializer = TypeSerializer(typeQuary, many=True)
            #print(serializer.data[0].get('TYPE'))
            return Response(serializer.data[0].get('TYPE'),status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)
