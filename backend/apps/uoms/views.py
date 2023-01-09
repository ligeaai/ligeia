from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import generics, permissions,status
from rest_framework.response import Response
from .models import uom
from .serializers import UomDetailsSerializer
import uuid
from apps.uom_base_unit.models import uom_base_unit
from services.parsers.addData.type import typeAddData

class UomSaveView(generics.CreateAPIView):
    
    serializer_class = UomDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        data['ROW_ID'] = uuid.uuid4().hex
        data['RESULT'] = "(A + BX) / (C + DX)"
        instance = uom.objects.create(**data)
        instance.save()
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)

# Create your views here.
class UOMScriptView(generics.ListAPIView):
    serializer_class = UomDetailsSerializer
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        typeAddData.import_data("UOM")
        return Response({"Message": "Succsessfull"}, status=status.HTTP_200_OK)

class UomDetialsView(generics.CreateAPIView):
    
    serializer_class = UomDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = uom.objects.filter(RP66_SYMBOL = request.data.get('UOM'))
      
        serializer = UomDetailsSerializer(queryset,many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)