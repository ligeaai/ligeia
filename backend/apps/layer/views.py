from datetime import datetime
import importlib
import uuid
from django.shortcuts import render
from apps.code_list.models import code_list
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


from .helpers import create_database, getDefaultDBSettings, deleteDB, to_layerDb

from .models import layer
from .serializers import (
    LayerSaveSerializer,
    LayerDropDownSerializer,
)


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
        data = self.updateData(request)
        validate_model_not_null(data, "LAYER", request=request)
        serializer = LayerSaveSerializer(data=data)
        serializer.is_valid()
        serializer.create(data)
        create_database(request.data, **request.data.get("DB_SETTINGS"))
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)

    def updateData(self, request):
        db_settings = getDefaultDBSettings()
        db_settings.update(request.data.get("DB_SETTINGS"))
        data = request.data
        data["DB_SETTINGS"] = db_settings
        data["LAST_UPDT_USER"] = str(request.user)
        data["ROW_ID"] = uuid.uuid4().hex
        data["VERSION"] = uuid.uuid4().hex
        data["LAST_UPDT_DATE"] = datetime.now().strftime("%Y-%m-%d")
        return data


class LayerUpdateView(generics.CreateAPIView):
    serializer_class = LayerSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = self.updateData(request)
        serializer = LayerSaveSerializer(data=data)
        serializer.is_valid()
        serializer.update(data)
        # create_database(request.data, **request.data.get("DB_SETTINGS"))
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)

    def updateData(self, request):
        data = request.data
        data["LAST_UPDT_USER"] = str(request.user)
        data["LAST_UPDT_DATE"] = datetime.now().strftime("%Y-%m-%d")
        return data


class LayerView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        import_data(layer, "layer")
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)


class LayerTreeMenuView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            qs = layer.objects.all().values("LAYER_NAME", "ROW_ID")
            return Response(qs)
        except Exception as e:
            return Response({"status": str(e)})


class LayerTreeMenuDetailsView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            qs = layer.objects.filter(ROW_ID=request.data.get("ROW_ID")).values()
            return Response(qs)
        except Exception as e:
            return Response({"status": str(e)})


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


class LayerDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            to_layerDb("STD")
            qs = layer.objects.filter(ROW_ID=request.data.get("ROW_ID"))
            if qs:
                layer_info = qs.values("LAYER_NAME", "DB_SETTINGS")
                layer_name = layer_info[0].get("LAYER_NAME")
                db_settings = layer_info[0].get("DB_SETTINGS")
                deleteDB(layer_name, db_settings)
                qs.delete()
                return Response(
                    {"Message": "Successful Delete "}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"Message": "data not found"}, status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            # print(e)
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
