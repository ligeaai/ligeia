import json
import time
from utils.permissions.admin import CreatePermission,ReadPermission,UpdatePermission,DeletePermission
from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import item
from .serializers import (
    ItemSaveSerializer,
    ItemDetailsSerializer,
    ItemSpacialSaveSerializer,
    ItemsSaveSerializer,
)
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
import uuid
from apps.item_property.serializers import (
    ItemPropertyNameSerializer,
    ItemPropertySpacialSaveSerializer,
)
from django.db.models import Max
from apps.item_property.models import item_property
from utils.models_utils import (
    validate_model_not_null,
    validate_find,
)
from apps.item_link.models import item_link
from apps.type_link.models import type_link
from apps.item_link.serializers import ItemLinkDetailsSerializer
from apps.type_link.serializers import TypeLinkDetailsSerializer
from services.logging.Handlers import KafkaLogger
from utils.utils import redisCaching as Red
from django.db import transaction
from django.db.models import Max, Subquery, OuterRef

logger = KafkaLogger()
create_per = CreatePermission(model_type="CODE_LIST")
read_per = CreatePermission(model_type="CODE_LIST")
update_per = CreatePermission(model_type="CODE_LIST")
delete_per = CreatePermission(model_type="CODE_LIST")

class ItemSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        validate_model_not_null(request.data, "item", request)
        serializer.is_valid()
        data = serializer.create(request.data)
        message = "Succsesfull created for item"
        logger.info(message, request=request)
        cache_key = str(request.user) + request.data.get("ITEM_ID")
        Red.delete(cache_key)
        return Response("Succsesfull", status=status.HTTP_201_CREATED)


class ItemScriptSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def _itemSave(self, request):
        serializer = ItemSpacialSaveSerializer(data=request.data["ITEM"])
        serializer.is_valid(raise_exception=True)
        items = serializer.save(request)

    def _propertySave(self, request):
        for property_data in request.data["PROPERTYS"]:
            property_data["ITEM_ID"] = request.data["ITEM"].get("ITEM_ID")
            property_data["ITEM_TYPE"] = request.data["ITEM"].get("ITEM_TYPE")
            property_data["LAST_UPDT_USER"] = str(request.user)
            property_data["LAYER_NAME"] = request.data["ITEM"].get("LAYER_NAME")
            property_serializer = ItemPropertySpacialSaveSerializer(data=property_data)
            property_serializer.is_valid(raise_exception=True)
            property_serializer.save(property_data)

    def _deleteProperty(self, request):
        if request.data.get("DELETED"):
            item_property.objects.filter(
                ITEM_ID=request.data["ITEM"].get("ITEM_ID"),
                START_DATETIME__in=request.data.get("DELETED"),
            ).delete()

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            self._itemSave(request)
            try:
                self._propertySave(request)
                self._deleteProperty(request)
                Red.delete(str(request.user) + request.data["ITEM"].get("ITEM_TYPE"))
            except Exception as e:
                transaction.set_rollback(True)
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)


class ItemCreateView(generics.CreateAPIView):

    serializer_class = ItemsSaveSerializer
    permission_classes = [permissions.AllowAny,create_per]
    
    def _itemSave(self, request):
        serializer = ItemSpacialSaveSerializer(data=request.data["ITEM"])
        serializer.is_valid(raise_exception=True)
        items = serializer.save(request)

    def _propertySave(self, request):
        for property_data in request.data["PROPERTYS"]:
            property_data["ITEM_ID"] = request.data["ITEM"].get("ITEM_ID")
            property_data["ITEM_TYPE"] = request.data["ITEM"].get("ITEM_TYPE")
            property_data["LAST_UPDT_USER"] = str(request.user)
            property_data["LAYER_NAME"] = request.data["ITEM"].get("LAYER_NAME")
            property_serializer = ItemPropertySpacialSaveSerializer(data=property_data)
            property_serializer.is_valid(raise_exception=True)
            property_serializer.save(property_data)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
           self._itemSave(request)
           try:
               self._propertySave(request)
           except Exception as e:
               transaction.set_rollback(True)
               return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
           return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)


        serializer = ItemsSaveSerializer(data=request.data["ITEM"])
        serializer.is_valid(raise_exception=True)
        items = serializer.create_item(request)
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)

class ItemUpdateView(generics.CreateAPIView):

    serializer_class = ItemsSaveSerializer
    permission_classes = [permissions.AllowAny,update_per]

    def post(self, request, *args, **kwargs):
        serializer = ItemsSaveSerializer(data=request.data["ITEM"])
        serializer.is_valid(raise_exception=True)
        items = serializer.update_item(request)
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)


class ItemView(generics.ListAPIView):

    serializer_class = ItemSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        typeAddData.import_data("ITEM")
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)


class ItemDetailsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny,read_per]
    lookup_field = "pk"

    def list(self, request, *args, **kwargs):
        item_type = self.kwargs["item"].upper()
        cache_key = str(request.user) + str(item_type)
        cache_data = Red.get(cache_key)
        if cache_data:
            Response(cache_data, status=status.HTTP_200_OK)
        items = item.objects.filter(ITEM_TYPE=item_type)
        item_ids = [item.ITEM_ID for item in items]
        latest_start_times = (
            item_property.objects.filter(
                ITEM_ID__in=item_ids,
                PROPERTY_TYPE="NAME",
            )
            .values("ITEM_ID")
            .annotate(latest_start_time=Max("START_DATETIME"))
        )
        property_names = item_property.objects.filter(
            ITEM_ID__in=Subquery(latest_start_times.values("ITEM_ID")),
            PROPERTY_TYPE="NAME",
            START_DATETIME__in=Subquery(latest_start_times.values("latest_start_time")),
        ).order_by("PROPERTY_STRING")
        serializer = ItemPropertyNameSerializer(property_names, many=True)
        # Red.set(cache_key, serializer.data)
        message = f"{request.user} listed the {item_type} items"
        logger.info(message, request)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ItemDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny,delete_per]

    def post(self, request, *args, **kwargs):
        queryset = item.objects.filter(ITEM_ID=request.data.get("ITEM_ID"))
        validate_find(queryset, request)
        queryset.delete()
        queryset_prop = item_property.objects.filter(
            ITEM_ID=request.data.get("ITEM_ID")
        )
        self._deleteItems(queryset_prop, request)
        queryset_to_item = item_link.objects.filter(
            TO_ITEM_ID=request.data.get("ITEM_ID")
        )
        self._deleteItems(queryset_to_item, request)
        queryset_from_item = item_link.objects.filter(
            FROM_ITEM_ID=request.data.get("ITEM_ID")
        )
        self._deleteItems(queryset_from_item, request)
        message = "Succsesfull deleted for items"
        logger.info(message, request=request)
        cache_key = str(request.user) + request.data.get("ITEM_ID")
        Red.delete(cache_key)
        return Response(message, status=status.HTTP_200_OK)

    def _deleteItems(self, qs, request):
        for data in qs:
            validate_find(data, request)
            data.delete()
