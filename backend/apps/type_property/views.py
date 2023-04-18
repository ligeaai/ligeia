from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from utils.models_utils import validate_find
from services.parsers.addData.type import typeAddData

# Create your views here.
from .models import type_property
from .serializers import TypePropertyDetailsSerializer, TypePropertySaveSerializer,TypePropertySaveUpdateSerializer
from utils.utils import import_data

class TypePropertySaveView(generics.CreateAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [permissions.AllowAny]


class TypePropertyView(generics.ListAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

        import_data(type_property,"type_property")
        return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)


class TypePropertyDetailView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):

        queryset = type_property.objects.filter(ROW_ID=request.data.get("ROW_ID"))
        validate_find(queryset)
        serializer = TypePropertyDetailsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TypePropertyEditorSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = TypePropertySaveUpdateSerializer(data = request)
        serializer.is_valid()
        serializer.save(request)
        
        return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)



class TypeDeleteView(generics.CreateAPIView):
    serializer_class = TypePropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
       
        qs = type_property.objects.filter(ROW_ID = request.data.get('ROW_ID'))
        validate_find(qs,request)
        qs.delete()
        return Response({"Message": "Successful Delete "}, status=status.HTTP_200_OK)
