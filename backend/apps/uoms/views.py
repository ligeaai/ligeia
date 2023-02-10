from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from utils.models_utils import validate_find
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import uom
from .serializers import UomDetailsSerializer, UomSaveUpdateSerializer
import uuid
from apps.uom_base_unit.models import uom_base_unit
from services.parsers.addData.type import typeAddData


class UomSaveView(generics.CreateAPIView):

    serializer_class = UomDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        data["ROW_ID"] = uuid.uuid4().hex
        data["RESULT"] = "(A + (B*X)) / (C + (D*X))"
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
        queryset = uom.objects.filter(QUANTITY_TYPE=request.data.get("QUANTITY_TYPE"))

        serializer = UomDetailsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UomEditorSaveUpdateView(generics.CreateAPIView):
    serializer_class = UomSaveUpdateSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UomSaveUpdateSerializer(data=request)
        serializer.is_valid()
        serializer.save(request)

        return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)


class UomDeleteView(generics.CreateAPIView):
    serializer_class = UomSaveUpdateSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = uom.object.filter(ROW_ID=request.data.get("ROW_ID"))
        validate_find(queryset, request)
        queryset.delete()
        return Response({"Message": "Successful Delete "}, status=status.HTTP_200_OK)
