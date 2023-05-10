import re
import couchdb
from apps.code_list.models import code_list
from apps.code_list.serializers import codeListNameSerializer
from apps.resources_types.models import resources_types
from apps.resources_types.serializers import (
    ResourceTypesSaveSerializer,
    ResourceTypesSerializer,
    ResourceTypesTypeSerializer,
)

from utils.utils import import_data
from apps.type_property.models import type_property
from apps.type_property.serializers import (
    TypePropertySaveSerializer,
    TypePropertyCustomSaveSerializer,
    TypePropertySerializer,
)
from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
from utils.utils import redisCaching as Red
from utils.models_utils import validate_model_not_null, validate_find

# Create your views here.
from .models import type as Type
from apps.templates.orm_CodeList import CodeListORM
from .serializers import (
    TypeDetailsSerializer,
    TypeSaveSerializer,
    TypeSerializer,
    TypeCustomSaveSerializer,
    TypeEditorSaveSerializer,
)
from services.logging.Handlers import KafkaLogger

logger = KafkaLogger()
from utils.utils import redisCaching as Red


def _getResourceTypes(data, culture):
    for index in range(0, len(data)):
        if data[index].get("SORT_ORDER"):
            data[index]["SORT_ORDER"] = int(data[index].get("SORT_ORDER"))
        queryset = resources_types.objects.filter(
            ID=data[index].get("LABEL_ID"), CULTURE=culture
        )
        if queryset:
            serializer = ResourceTypesSerializer(queryset, many=True)
            data[index]["SHORT_LABEL"] = serializer.data[0].get("SHORT_LABEL")
            data[index]["MOBILE_LABEL"] = serializer.data[0].get("MOBILE_LABEL")
    return data


class TypeSaveView(generics.CreateAPIView):
    serializer_class = TypeSaveSerializer
    res = ResourceTypesSaveSerializer
    permission_classes = [permissions.AllowAny]


class TypeEditorSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = TypeEditorSaveSerializer(data=request)
        serializer.is_valid()
        serializer.save(request)
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)


class TypeAndPropertySaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = TypeCustomSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(request)
        serializer = TypePropertyCustomSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(request)
        serializer = ResourceTypesTypeSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(request)
        return Response({"Message": "Successful"}, status=status.HTTP_201_CREATED)


class TypeDeleteView(generics.UpdateAPIView):
    serializer_class = TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = Type.objects.filter(TYPE=request.data.get("TYPE"))
        validate_find(qs, request)
        qs.delete()
        message = {"Message": "Successful Delete "}
        logger.info(message, request=request)
        return Response(message, status=status.HTTP_200_OK)


class TypeEditorPropertyView(generics.CreateAPIView):
    serializer_class = TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = Type.objects.filter(TYPE=request.data.get("TYPE"))
        serializer = TypeDetailsSerializer(queryset, many=True)
        queryset_types_prop = type_property.objects.filter(
            TYPE=serializer.data[0].get("TYPE")
        )
        new_list = []
        serializer_prop = TypePropertySerializer(queryset_types_prop, many=True)
        serializer.data[0]["HIEARCHY"] = serializer.data[0].get("ROW_ID")
        new_list.append(serializer.data[0])
        for index in range(len(serializer_prop.data)):
            serializer_prop.data[index]["HIEARCHY"] = [
                serializer.data[0].get("ROW_ID"),
                serializer_prop.data[index].get("ROW_ID"),
            ]
            new_list.append(serializer_prop.data[index])
        return Response(new_list, status=status.HTTP_200_OK)


class TypeWorkflowView(generics.CreateAPIView):
    serializer_class = TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get_quaryset(self):
        pass

    def post(self, request, *args, **kwargs):
        queryset = Type.objects.filter(TYPE_CLASS="ITEM").order_by("TYPE")
        serializer = TypeDetailsSerializer(queryset, many=True)
        data = _getResourceTypes(serializer.data, request.data.get("CULTURE"))
        # sorted_list = sorted(list(serializer.data), key=lambda d: str(d['TYPE']))

        return Response(data, status=status.HTTP_200_OK)


class TypeEditorBaseView(generics.CreateAPIView):
    serializer_class = TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = Type.objects.all().order_by("TYPE")
        serializer = TypeDetailsSerializer(queryset, many=True)
        serializer.data = _getResourceTypes(
            serializer.data, request.data.get("CULTURE")
        )
        # sorted_list = sorted(list(serializer.data), key=lambda d: str(d['TYPE']))

        return Response({"Message": serializer.data}, status=status.HTTP_200_OK)


class TypeView(generics.ListAPIView):
    serializer_class = TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        import_data(Type, "type")

        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class TypeDetailNewView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = [
        TypeSerializer,
        TypePropertySerializer,
    ]

    def post(self, request):
        cache_key = (
            str(request.user)
            + str(request.data.get("CULTURE"))
            + str(request.data.get("TYPE"))
        )
        # cache_data = Red.get(cache_key)
        # if cache_data:
        #     logger.info(request=request, message="Type details")
        #     print('CACHE')
        #     return Response(cache_data, status=status.HTTP_200_OK)

        TypePropertys = self._baseModels(request)
        # Red.set(cache_key,TypePropertys)
        return Response(TypePropertys, status=status.HTTP_200_OK)

    def _baseModels(self, request):
        queryset = Type.objects.filter(TYPE=request.data.get("TYPE"))
        validate_find(queryset, request)
        serializer = TypeSerializer(queryset, many=True)
        types = []
        propertys = {}
        cultures = request.data.get("CULTURE")
        self._getTypes(serializer.data[0], types)
        self._getPropertys(types, propertys, cultures)
        return propertys

    def _getTypes(self, data, types):
        types.append(data.get("TYPE"))
        queryset = Type.objects.filter(TYPE=data.get("BASE_TYPE"))
        if queryset:
            serializer = TypeSerializer(queryset, many=True)
            self._getTypes(serializer.data[0], types)

    def _getPropertys(self, types, propertys, culture):
        for item in types:
            queryset = type_property.objects.filter(TYPE=item)
            serializer = TypePropertySerializer(queryset, many=True)
            serializer.data = _getResourceTypes(serializer.data, culture)
            # self._getCodeList(serializer.data,culture)
            propertys[item] = serializer.data
