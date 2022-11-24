from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from utils.models_utils import validate_find
from services.parsers.addData.type import typeAddData

# Create your views here.
from .models import type_property
from .serializers import TypePropertyDetailsSerializer, TypePropertySaveSerializer


class TypePropertySaveView(generics.CreateAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [permissions.AllowAny]


class TypePropertyView(generics.ListAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

       typeAddData.import_data("TYPE_PROPERTY")
       return Response({"Message": "succsesful"}, status=status.HTTP_200_OK)


class TypePropertyDetailView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        
        queryset = type_property.objects.filter(ROW_ID=request.data.get('ROW_ID'))
        validate_find(queryset)
        serializer = TypePropertyDetailsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
       


class TypePropertyUpdateView(generics.UpdateAPIView):
    serializer_class = TypePropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def put(self, request, *args, **kwargs):
        filter = request.data.get("FILTER")
        data = request.data.get("ITEMS")
        qs = type_property.objects.filter(**data).update
    
        return Response({"Message": "Successful Update "}, status=status.HTTP_200_OK)


class TypeDeleteeView(generics.DestroyAPIView):
    serializer_class = TypePropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def delete(self, request, *args, **kwargs):
        filter = request.data.get("FILTER")
        qs = type_property.objects.filter(**filter).delete()
        return Response({"Message": "Successful Delete "}, status=status.HTTP_200_OK)
