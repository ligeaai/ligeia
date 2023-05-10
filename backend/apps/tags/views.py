from django.shortcuts import render
from .models import tags
import uuid
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from .serializers import (
    TagsDetiailsSerializer,
    TagsSaveSerializer,
    TagsNameSerializer,
    TagsFieldsSerializer,
    TagsUomConversionSerializer,
    TagsImportFileSerializer,
)
from apps.type_property.models import type_property
from apps.resources_types.models import resources_types
from apps.resources_types.serializers import ResourceTypesLabelSerializer
from apps.type_property.serializers import TypePropertyDetailsSerializer
from apps.item_link.models import item_link
from apps.item_link.serializers import ItemLinkSaveSerializer, ItemLinkDetailsSerializer
from apps.type_link.models import type_link
from apps.type.models import type as type_model
from apps.type.serializers import TypeResourceListManagerSerializer
from apps.code_list.models import code_list
from apps.templates.orm_CodeList import CodeListORM
from apps.type_link.serializers import TypeLinkDetailsSerializer
from utils.models_utils import validate_model_not_null
import datetime
from django.db import transaction
from io import StringIO, BytesIO
import io
import pandas as pd
import numpy as np
from apps.item_property.models import item_property
from utils.utils import tag_import_mandorty

# Create your views here.


# class TagsSaveView(generics.CreateAPIView):
#     serializer_class = TagsFieldsSerializer
#     permission_classes = [permissions.AllowAny]

#     def post(self, request, *args, **kwargs):
#         data = request.data
#         data["LAYER_NAME"] = "KNOC"
#         tags.objects.create(**data)
#         return Response("okey")


class TagsSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            tags_dict = request.data
            link_dict = {
                "LINK_ID": tags_dict.get("LINK_ID"),
                "TO_ITEM_ID": tags_dict.get("ITEM_ID"),
                "TO_ITEM_TYPE": tags_dict.get("TRANSACTION_TYPE"),
                "END_DATETIME": "9000-01-01",
                "FROM_ITEM_ID": tags_dict.get("TAG_ID"),
                "FROM_ITEM_TYPE": "TAG_CACHE",
                "LINK_TYPE": "TAG_ITEM",
                "START_DATETIME": tags_dict.get("START_DATETIME"),
                "ROW_ID": uuid.uuid4().hex,
                # "LAST_UPDT_USER":request.user
            }
            del tags_dict["LINK_ID"]
            validate_model_not_null(tags_dict, "tags", request=request)
            serializer = TagsSaveSerializer(data=tags_dict)
            serializer.is_valid()
            message = serializer.save(tags_dict)
            try:
                validate_model_not_null(link_dict, "ITEM_LINK", request=request)
                link_serializer = ItemLinkSaveSerializer(data=request.data.get("LINK"))
                link_serializer.is_valid()
                message = link_serializer.save(link_dict)
            except Exception as e:
                transaction.set_rollback(True)
                return Response({"error": e}, status=status.HTTP_400_BAD_REQUEST)

            return Response(message, status=status.HTTP_200_OK)


class TagsDetailsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        pass

    def get(self, request, *args, **kwargs):
        queryset = tags.objects.all().order_by("NAME").values()
        serializer = TagsDetiailsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TagsSpesificDetailsView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        pass

    def post(self, request, *args, **kwargs):
        queryset = tags.objects.filter(TAG_ID=request.data.get("TAG_ID"))
        serializer = TagsFieldsSerializer(queryset, many=True)
        qs_item = item_link.objects.filter(FROM_ITEM_ID=request.data.get("TAG_ID"))
        if qs_item:
            item_serializer = ItemLinkDetailsSerializer(qs_item, many=True)
            serializer.data[0]["LINK_ID"] = item_serializer.data[0].get("LINK_ID")
        return Response(serializer.data, status=status.HTTP_200_OK)


class TagsDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = tags.objects.filter(TAG_ID=request.data.get("TAG_ID"))
        if qs:
            qs.delete()
        return Response("Succsessful", status=status.HTTP_200_OK)


from concurrent.futures import ThreadPoolExecutor
import asyncio
from utils.utils import redisCaching as Red
from datetime import datetime
import numpy as np
import json
import environ
import redis

env = environ.Env(DEBUG=(bool, False))
rds = redis.StrictRedis(env("REDIS_HOST"), port=6379, db=0)


class TagsImportDeleteView(generics.ListAPIView):
    serializer_class = TagsImportFileSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        Red.delete("importTag")
        return Response("Successful", status=status.HTTP_200_OK)


class TagsImportHistoryListView(generics.ListAPIView):
    serializer_class = TagsImportFileSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        pass

    def get(self, request, *args, **kwargs):
        try:
            hash_dict = Red.get("importHistory")
            keys = list(hash_dict.keys())
            return Response(keys, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class TagsImportHistoryView(generics.ListAPIView):
    serializer_class = TagsImportFileSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "pk"

    def get_queryset(self):
        pass

    def get(self, request, *args, **kwargs):
        try:
            hash_dict = Red.get("importHistory")
            keys = self.kwargs["keys"]
            data = json.loads(hash_dict.get(keys))
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class TagsImportView(generics.CreateAPIView):
    serializer_class = TagsImportFileSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            try:
                csv_data = pd.read_csv(
                    BytesIO(request.FILES["files"].read()),
                    encoding="ISO-8859-1",
                    sep=";",
                    index_col=False,
                )
                if len(csv_data.columns) < 2:
                    csv_data = pd.read_csv(
                        BytesIO(request.FILES["files"].read()),
                        encoding="ISO-8859-1",
                        sep=",",
                        index_col=False,
                    )
            except:
                csv_data = pd.read_excel(
                    BytesIO(request.FILES["file"].read()),
                    encoding="ISO-8859-1",
                    sep=";",
                )

            tag_import_mandorty(list(csv_data.columns))
            if "LINK_TO" in list(csv_data.columns):
                csv_data.rename(columns={"LINK_TO": "ITEM_ID"}, inplace=True)
            csv_data = csv_data.replace(np.nan, None)
            json_data = csv_data.to_dict(orient="records")
            chunk_size = 1000
            chunked_data = [
                json_data[i : i + chunk_size]
                for i in range(0, len(json_data), chunk_size)
            ]
            index = 1
            for chunk in chunked_data:
                chunk_list = self.create_list(chunk)
                chunk_list.append((len(csv_data), index * len(chunk)))
                tags.objects.bulk_create(chunk_list)
                index += 1
            hash_dict = Red.get("importHistory")
            data = list(rds.lrange("importTag", 0, -1))
            if hash_dict:
                hash_dict[request.FILES["files"].name] = data[1].decode("utf-8")
                Red.set("importHistory", hash_dict)
            else:
                hash_dict = {request.FILES["files"].name: data[1].decode("utf-8")}
                Red.set("importHistory", hash_dict)
            return Response("Successful", status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def create_list(self, chunk):
        tempt = []
        for item in chunk:
            props = item_property.objects.filter(
                PROPERTY_TYPE="NAME", PROPERTY_STRING=item["ITEM_ID"]
            ).values("ITEM_ID", "ITEM_TYPE")
            item["ITEM_ID"] = None
            if props:
                item["ITEM_ID"] = props[0]["ITEM_ID"]
                item["TRANSACTION_TYPE"] = props[0]["ITEM_TYPE"]

            if item["START_DATETIME"] is None:
                now = datetime.now()
                item["START_DATETIME"] = now.strftime("%Y-%m-%d")

            item["EVENT_TYPE"] = "E"
            item["TAG_ID"] = uuid.uuid4().hex
            item["ROW_ID"] = uuid.uuid4().hex
            item["LAYER_NAME"] = "TEST"
            models = tags(**item)
            tempt.append(tags(**item))
        return tempt


# class TagsImportView(generics.CreateAPIView):

#     serializer_class = TagsSaveSerializer
#     permission_classes = [permissions.AllowAny]

#     def post(self, request, *args, **kwargs):
#         with transaction.atomic():
#             try:
#                 data = request.data
#                 chunked_data = [data[i:i+1000] for i in range(0, len(data), 1000)]
#                 if is_relationship:
#                     for chunk in chunked_data:
#                         tags.objects.bulk_create(chunk)
#                 else:
#                     for chunk in chunked_data:
#                         tags.objects.bulk_create([tags(**item) for item in chunk])
#                 return Response("Succsessful", status=status.HTTP_200_OK)
#             except Exception as e:
#                 print(str(e))
#                 transaction.set_rollback(True)
#                 return{"error": str(e)}


class TagsPropertysView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        tag_info = type_property.objects.filter(TYPE="TAG_INFO")
        tag_link = type_property.objects.filter(TYPE="TAG_LINK")
        serializer_info = TypePropertyDetailsSerializer(tag_info, many=True).data
        serializer_link = TypePropertyDetailsSerializer(tag_link, many=True).data
        tag_INFO = []
        tag_LINK = []
        self._resourceLabel(serializer_info, tag_INFO, request.data.get("CULTURE"))
        self._resourceLabel(serializer_link, tag_LINK, request.data.get("CULTURE"))
        new_dict = {"TAG_INFORMATIONS": tag_INFO, "TAG_LINK": tag_LINK}
        return Response(new_dict, status=status.HTTP_200_OK)

    def _resourceLabel(self, data, dataList, culture):
        label_ids = [item.get("LABEL_ID") for item in data]
        qs_resources = resources_types.objects.filter(ID__in=label_ids, CULTURE=culture)
        resources = {}
        for resource in qs_resources:
            resources[resource.ID] = {
                "SHORT_LABEL": resource.SHORT_LABEL,
                "MOBILE_LABEL": resource.MOBILE_LABEL,
            }

        for item in data:
            if item.get("CODE_LIST"):
                qs_codeList = code_list.objects.filter(
                    LIST_TYPE=item.get("CODE_LIST"), CULTURE=culture
                )
                item["CODE"] = CodeListORM.getCodeList(
                    qs_codeList, culture=culture, hierarchy=False
                )

            resource = resources.get(item.get("LABEL_ID"))
            if resource:
                item["SHORT_LABEL"] = resource.get("SHORT_LABEL")
                item["MOBILE_LABEL"] = resource.get("MOBILE_LABEL")
            dataList.append(item)


class TagsTypeLinkView(generics.CreateAPIView):
    def get_queryset(self):
        pass

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        culture = request.data.get("CULTURE")
        to_type = list(
            type_link.objects.filter(TYPE="TAG_ITEM")
            .values_list("TO_TYPE", flat=True)
            .order_by("TO_TYPE")
        )
        query = (
            type_model.objects.filter(TYPE__in=to_type)
            .values_list("LABEL_ID", flat=True)
            .order_by("TYPE")
        )

        qs_resource = resources_types.objects.filter(
            ID__in=query, CULTURE=culture
        ).order_by("ID")

        labels = ResourceTypesLabelSerializer(qs_resource, many=True).data
        response_value = [
            {**label, "TO_TYPE": to_type} for label, to_type in zip(labels, to_type)
        ]
        return Response(response_value, status=status.HTTP_200_OK)


class TagsNameViews(generics.CreateAPIView):
    serializer_class = TagsDetiailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = tags.objects.filter(NAME=request.data.get("TAG_NAME"))
        serializer = TagsNameSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TagsSearchViews(generics.CreateAPIView):
    serializer_class = TagsDetiailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = tags.objects.filter(NAME__icontains=request.data.get("asset"))
        serializer = TagsDetiailsSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TagsUomConversionView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        pass

    def get(self, request, *args, **kwargs):
        queryset = tags.objects.all().order_by("NAME").values()
        serializer = TagsUomConversionSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
