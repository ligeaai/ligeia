from django.shortcuts import render
from rest_framework import generics, permissions,status
from rest_framework.response import Response
from .models import uom
from .serializers import UomDetailsSerializer
import uuid

from services.parsers.addData.type import typeAddData

class UomSaveView(generics.CreateAPIView):
    
    serializer_class = UomDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        data['ROW_ID'] = uuid.uuid4().hex
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