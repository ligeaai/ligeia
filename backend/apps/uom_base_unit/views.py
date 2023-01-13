from django.shortcuts import render
from rest_framework import generics, permissions,status
from rest_framework.response import Response
from .models import uom_base_unit
from .serializers import UomUnitDetailsSerializer,UomUnitQuantitySerializer
import uuid
from apps.uoms.models import uom
from apps.uoms.serializers import UomQuantitySerializer
from services.parsers.addData.type import typeAddData

class UomUnitSaveView(generics.CreateAPIView):
    
    serializer_class = UomUnitDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        data['ROW_ID'] = uuid.uuid4().hex
        instance = uom_base_unit.objects.create(**data)
        instance.save()
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class UomUnitScriptView(generics.ListAPIView):
    serializer_class = UomUnitDetailsSerializer
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        typeAddData.import_data("UOM_UNIT")
        return Response({"Message": "Succsessfull"}, status=status.HTTP_200_OK)


class UomUnitDetialsView(generics.CreateAPIView):
    
    serializer_class = UomUnitDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = uom_base_unit.objects.filter(RP66_SYMBOL = request.data.get('UOM'))
        serializer = UomUnitDetailsSerializer(queryset,many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UomUnitsDetailView(generics.ListAPIView):
    serializer_class = UomUnitDetailsSerializer
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        queryset = uom_base_unit.objects.all()
        serializer = UomUnitDetailsSerializer(queryset,many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UomQuantityTypeDetailView(generics.ListAPIView):
    serializer_class = UomUnitQuantitySerializer
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        pass
    def get(self, request, *args, **kwargs):
        queryset = uom_base_unit.objects.all().distinct("QUANTITY_TYPE")
        queryset2 = uom.objects.all().distinct("QUANTITY_TYPE")
        serializerUnit = UomUnitQuantitySerializer(queryset,many = True)
        serializer = UomQuantitySerializer(queryset2,many = True)
        data = list(serializerUnit.data) + list(serializer.data)
        return Response(data, status=status.HTTP_200_OK)