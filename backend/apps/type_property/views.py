
from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData

# Create your views here.
from .models import type_property
from .serializers import (TypePropertyDetailsSerializer,
                          TypePropertySaveSerializer)


class TypePropertySaveView(generics.CreateAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]

class TypePropertyView(generics.ListAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        data = typeAddData.create_type_property_data()
        return Response({"Error":'girdi'}, status=status.HTTP_200_OK)


class TypePropertyDetailView(generics.ListAPIView):

    queryset = type_property.objects.all()
    serializer_class = TypePropertyDetailsSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        try:
            queryset = self.get_queryset()
            serializer = TypePropertyDetailsSerializer(queryset, many=True)
            
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)

class TypePropertyUpdateView(generics.UpdateAPIView):
    serializer_class = TypePropertySaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def put(self, request, *args, **kwargs):
        filter = request.data.get('FILTER')
        data = request.data.get('ITEMS')
        qs = type_property.objects.filter(**data).update

        # serializer = TypeSaveSerializer(qs, data=data, many=True)

        # if serializer.is_valid():
        # #     serializer.save()
        return Response({'Message':'Successful Update '},status=status.HTTP_200_OK)