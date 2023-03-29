from django.shortcuts import render
from utils.permissions.employee import IsEmployeeUser
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, permissions
from rest_framework.response import Response
import uuid
from rest_framework import status
from .serializers import (
    ResourceListDetailsSerializer,
    ResourceListSaveSerializer,
    ResourceListParentSerializer,
)
from apps.type.models import type as Type
from apps.type.serializers import (
    TypeResourceListManagerSerializer,
    TypeDetailsSerializer,
)
from django.db.models import Q
from .models import resource_list
from apps.type_link.models import type_link
from apps.type_link.serializers import TypeLinkDetails2Serializer
from services.parsers.addData.type import typeAddData
from utils.models_utils import validate_model_not_null, validate_find


class ResourceListUserDrawerMenutView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsEmployeeUser]

    def _getChild(self, data):
        for item in data:
            id = item.get("PARENT")
            queryset = resource_list.objects.filter(
                Q(ID=id) & Q(CULTURE=self.culture) & Q(HIDDEN=False) & Q(REV_GRP_ID=3)
            ).order_by("SORT_ORDER")
            if queryset:
                serializer = ResourceListDetailsSerializer(queryset, many=True)
                self._getChild(serializer.data)
                parent_label = item.get("SHORT_LABEL")
                item["Items"] = serializer.data
                self.new_dict[parent_label] = item
            elif item.get("ID") == "drawerMenu":
                parent_label = item.get("SHORT_LABEL")
                self.new_dict[parent_label] = item

    def post(self, request, *args, **kwargs):
        self.culture = request.data.get("CULTURE")
        queryset = resource_list.objects.filter(
            Q(ID="drawerMenu")
            & Q(CULTURE=self.culture)
            & Q(HIDDEN=False)
            & Q(REV_GRP_ID=3)
        ).order_by("SORT_ORDER")

        validate_find(queryset, request)

        serializer = ResourceListDetailsSerializer(queryset, many=True)
        self.new_dict = dict()
        self._getChild(serializer.data)
        return Response(self.new_dict, status=status.HTTP_200_OK)
