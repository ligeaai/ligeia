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
)
from apps.type_property.models import type_property
from apps.resource_list.models import resource_list
from apps.resource_list.serializers import ResourceListLabelSerializer
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
        qs_resources = resource_list.objects.filter(ID__in=label_ids, CULTURE=culture)
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
            type_link.objects.filter(TYPE="TAGS")
            .values_list("TO_TYPE", flat=True)
            .order_by("TO_TYPE")
        )

        query = (
            type_model.objects.filter(TYPE__in=to_type)
            .values_list("LABEL_ID", flat=True)
            .order_by("TYPE")
        )

        qs_resource = resource_list.objects.filter(
            ID__in=query, CULTURE=culture
        ).order_by("ID")

        labels = ResourceListLabelSerializer(qs_resource, many=True).data
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
