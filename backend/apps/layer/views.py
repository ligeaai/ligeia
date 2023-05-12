from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
from utils.utils import redisCaching as Red
from utils.models_utils import (
    validate_model_not_null,
    validate_find,
)
from utils.utils import import_data

# Create your views here.
from .models import layer
from .serializers import LayerSaveSerializer, LayerDropDownSerializer


class LayerDropDownView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return

    def get(self, request, *args, **kwargs):
        queryset = list(layer.objects.values_list("LAYER_NAME", flat=True))
        return Response(
            queryset,
            status=status.HTTP_200_OK,
        )


class LayerSaveView(generics.CreateAPIView):
    serializer_class = LayerSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        validate_model_not_null(request.data, "LAYER", request=request)
        serializer = LayerSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.create(request.data)
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)


class LayerView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        import_data(layer, "layer")
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)


class LayerModelViewSet(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        queryset = layer.objects.filter(ROW_ID=request.data.get("ROW_ID"))
        validate_find(queryset)
        serializer = LayerSaveSerializer(data=queryset, many=True)
        serializer.is_valid()
        return Response(
            {"Message": "Successful", "BODY": serializer.data},
            status=status.HTTP_200_OK,
        )


class LayerUpdateView(generics.UpdateAPIView):
    permission_classes = permissions.AllowAny

    def put(self, request, *args, **kwargs):
        data = request.data.get("DATA")
        qs = layer.objects.filter(LAYER_NAME=request.data.get("LAYER_NAME"))
        if qs:
            qs.update(data)
            return Response(
                {"Message": "Successful Update "}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"Message": "Data Not Found"}, status=status.HTTP_400_BAD_REQUEST
            )


class LayerDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = layer.objects.filter(LAYER_NAME=request.data.get("LAYER_NAME"))
        if qs:
            qs.delete()
            return Response(
                {"Message": "Successful Delete "}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"Message": "data not found"}, status=status.HTTP_400_BAD_REQUEST
            )
