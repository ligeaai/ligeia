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
from apps.resource_list.serializers import ResourceListSerializer
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

# Create your views here.


class TagsSaveView(generics.CreateAPIView):
    serializer_class = TagsFieldsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        data["LAYER_NAME"] = "KNOC"
        tags.objects.create(**data)
        return Response("okey")


# class TagsSaveView(generics.CreateAPIView):

#     permission_classes = [permissions.AllowAny]

#     def post(self, request, *args, **kwargs):
#         tags_dict = request.data
#         link_dict = dict()
#         try:
#             links_list = [
#                 "LINK_ID",
#                 "LINK_TYPE",
#                 "END_DATETIME",
#                 "FROM_ITEM_ID",
#                 "FROM_ITEM_TYPE",
#                 "TO_ITEM_ID",
#                 "TO_ITEM_TYPE",
#             ]
#             for keys in links_list:
#                 link_dict[keys] = request.data.get(keys)
#                 tags_dict.pop(keys)
#         except:
#             pass
#         link_dict["START_DATETIME"] = tags_dict.get("START_DATETIME")
#         link_dict["ROW_ID"] = uuid.uuid4().hex
#         validate_model_not_null(tags_dict, "tags", request=request)
#         validate_model_not_null(link_dict, "ITEM_LINK", request=request)
#         serializer = TagsSaveSerializer(data=request)
#         serializer.is_valid()
#         message = serializer.save(tags_dict)
#         link_serializer = ItemLinkSaveSerializer(data=request.data.get("LINK"))
#         link_serializer.is_valid()
#         message = link_serializer.save(link_dict)
#         return Response(message, status=status.HTTP_200_OK)


class TagsDetailsView(generics.ListAPIView):

    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        pass

    def get(self, request, *args, **kwargs):
        queryset = tags.objects.all()
        serializer = TagsDetiailsSerializer(queryset, many=True)
        sorted_list = sorted(list(serializer.data), key=lambda d: str(d["NAME"]))
        return Response(sorted_list, status=status.HTTP_200_OK)


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
        queryset = type_property.objects.filter(TYPE="TAG_INFO")
        serializer = TypePropertyDetailsSerializer(queryset, many=True)
        queryset_link = type_property.objects.filter(TYPE="TAG_LINK")
        serializer_link = TypePropertyDetailsSerializer(queryset_link, many=True)
        tag_INFO = []
        tag_LINK = []
        self._resourceLabel(serializer.data, tag_INFO, request.data.get("CULTURE"))
        self._resourceLabel(serializer_link.data, tag_LINK, request.data.get("CULTURE"))
        new_dict = {"TAG_INFORMATIONS": tag_INFO, "TAG_LINK": tag_LINK}
        return Response(new_dict, status=status.HTTP_200_OK)

    def _resourceLabel(self, data, dataList, culture):
        for item in data:
            if item.get("CODE_LIST"):
                qs_codeList = code_list.objects.filter(
                    LIST_TYPE=item.get("CODE_LIST"), CULTURE=culture
                )
                item["CODE"] = CodeListORM.getCodeList(
                    qs_codeList, culture=culture, hierarchy=False
                )

            qs_resource = resource_list.objects.filter(
                ID=item.get("LABEL_ID"), CULTURE=culture
            )

            if qs_resource:
                serializer_rs = ResourceListSerializer(qs_resource, many=True)
                item["SHORT_LABEL"] = serializer_rs.data[0].get("SHORT_LABEL")
                item["MOBILE_LABEL"] = serializer_rs.data[0].get("MOBILE_LABEL")
            dataList.append(item)


class TagsTypeLinkView(generics.CreateAPIView):
    def get_queryset(self):
        pass

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = type_link.objects.filter(TYPE="TAGS")
        serializer = TypeLinkDetailsSerializer(queryset, many=True)
        self.get_TypeName(serializer.data, request.data.get("CULTURE"))
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_TypeName(self, data, culture):
        for index in range(len(data)):
            try:
                qs = type_model.objects.filter(TYPE=data[index].get("TO_TYPE"))
                serializer = TypeResourceListManagerSerializer(qs, many=True)
                label_id = serializer.data[0].get("LABEL_ID")
                qs_resource = resource_list.objects.filter(ID=label_id, CULTURE=culture)
                if qs_resource:
                    serializer_rs = ResourceListSerializer(qs_resource, many=True)
                    data[index]["SHORT_LABEL"] = serializer_rs.data[0].get(
                        "SHORT_LABEL"
                    )
                    data[index]["MOBILE_LABEL"] = serializer_rs.data[0].get(
                        "MOBILE_LABEL"
                    )
            except:
                qs = type_model.objects.filter(TYPE=data[index].get("TO_TYPE"))
                print(data[index].get("TO_TYPE"))


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
        queryset = tags.objects.all()
        serializer = TagsUomConversionSerializer(queryset, many=True)
        sorted_list = sorted(list(serializer.data), key=lambda d: str(d["NAME"]))
        return Response(sorted_list, status=status.HTTP_200_OK)
