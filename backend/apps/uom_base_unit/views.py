from django.shortcuts import render
from utils.models_utils import validate_find
from rest_framework import generics, permissions,status
from rest_framework.response import Response
from .models import uom_base_unit
from .serializers import UomUnitDetailsSerializer,UomUnitQuantitySerializer,BaseUOMSaveUpdateSerializer
import uuid
from django.db.models import Q
from apps.uoms.models import uom
from apps.uoms.serializers import UomQuantitySerializer,UomDetailsSerializer
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


class UomUnitDetailView(generics.CreateAPIView):
    
    serializer_class = UomUnitDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = uom_base_unit.objects.filter(QUANTITY_TYPE = request.data.get('QUANTITY_TYPE'))
        serializer = UomUnitDetailsSerializer(queryset,many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UomUnitDetailsView(generics.ListAPIView):
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


class UomUnitsNameView(generics.CreateAPIView):
    serializer_class = UomUnitDetailsSerializer
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        querysetBaseUom = uom_base_unit.objects.filter(Q(QUANTITY_TYPE = request.data.get('QUANTITY_TYPE')),~Q(CATALOG_SYMBOL ='(Deprecated)')).distinct("CATALOG_SYMBOL")
        querysetUoms = uom.objects.filter(Q(QUANTITY_TYPE = request.data.get('QUANTITY_TYPE')),~Q(CATALOG_SYMBOL ='(Deprecated)')).distinct("CATALOG_SYMBOL")
        serializerBaseUom = UomUnitDetailsSerializer(querysetBaseUom,many = True)
        serializerUoms = UomDetailsSerializer(querysetUoms,many = True)
        data = list(serializerBaseUom.data) + list(serializerUoms.data)
        return Response(data, status=status.HTTP_200_OK)


class BaseUomEditorSaveUpdateView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = BaseUOMSaveUpdateSerializer(data = request)
        serializer.is_valid()
        serializer.save(request)
        
        return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)



class BaseUomDeleteView(generics.CreateAPIView):
    serializer_classes = UomUnitDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = uom_base_unit.object.filter(ROW_ID = request.data.get('ROW_ID'))
        validate_find(queryset,request)
        queryset.delete()
        return Response({"Message": "Successful Delete "}, status=status.HTTP_200_OK)

