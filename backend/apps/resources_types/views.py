from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, permissions
from rest_framework.response import Response
import uuid
from rest_framework import status
from .serializers import (
    ResourceTypesDetailsSerializer,
    ResourceTypesSaveSerializer,
    ResourceTypesParentSerializer,
)
from apps.type.models import type as Type
from apps.type.serializers import (
    TypeResourceListManagerSerializer,
    TypeDetailsSerializer,
)

# Create your views here.
from .models import resources_types
from apps.type_link.models import type_link
from apps.type_link.serializers import TypeLinkDetails2Serializer
from services.parsers.addData.type import typeAddData
from utils.models_utils import validate_model_not_null, validate_find
from utils.utils import import_data

class ResourceTypesSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        validate_model_not_null(request.data, "resources_types", request)
        serializer = ResourceTypesSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.create(request.data)
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class ResourceTypesView(generics.ListAPIView):

    serializer_class = ResourceTypesSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

        import_data(resources_types,"resources_types")
        return Response({"Message": "Succsessfull"}, status=status.HTTP_200_OK)

class ResourceTypesDrawerMenutView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        culture = request.data.get("CULTURE")
        queryset = resources_types.objects.filter(
            ID="drawerMenu", CULTURE=culture, HIDDEN=False
        ).order_by("SORT_ORDER")
        validate_find(queryset, request)
        serializer = ResourceTypesDetailsSerializer(queryset, many=True)
        new_dict = dict()
        self.layers = []
        self._getchild(serializer.data, new_dict, 0, culture)
        return Response(new_dict, status=status.HTTP_200_OK)

    def _getchild(self, data, new_dict, sart, culture):
        for item in data:
            queryset = resources_types.objects.filter(
                ID=item.get("PARENT"), CULTURE=culture, HIDDEN=False
            )
            serializer = ResourceTypesDetailsSerializer(queryset, many=True)
            if queryset:
                tempt = {}
                for value in serializer.data:
                    layer = value.get("PARENT")
                    self.layers.append(layer)
                    if str(layer).split(".")[0] == "TYPE":
                        try:
                            serializer.data.remove(value)
                        except:
                            pass
                        types = layer.split(".")[1]
                        if types == "OG_STD":
                            queryset = Type.objects.filter(LAYER_NAME=types)
                        else:
                            queryset = Type.objects.filter(LABEL_ID=layer)
                        serializer = TypeResourceListManagerSerializer(
                            queryset, many=True
                        )
                        self._getResourceLabel(
                            serializer.data, tempt, value.get("CULTURE"), types
                        )

                    else:
                        tempt[value.get("SHORT_LABEL")] = value
                item["Items"] = tempt

            if sart == 0:
                new_dict[item.get("SHORT_LABEL")] = item
            self._getchild(serializer.data, new_dict, 1, culture)

    def _getResourceLabel(self, data, tempt, culture, types):
        find_type = []
        if types == "OG_STD":
            find_type = self.layers
        for item in data:
            try:
                x = find_type.index(item.get("LABEL_ID"))
            except:
                tempt2 = {}
                queryset = resources_types.objects.filter(
                    ID=item.get("LABEL_ID"), CULTURE=culture, HIDDEN=False
                )
                serializer = ResourceTypesDetailsSerializer(queryset, many=True)
                serializer.data[0]["TYPE"] = item.get("TYPE")
                if item.get("LABEL_ID") == "TYPE.ORG_UNIT2":
                    short_label = serializer.data[0].get("SHORT_LABEL")
                    serializer.data[0]["SHORT_LABEL"] = serializer.data[0].get(
                        "MOBILE_LABEL"
                    )
                    serializer.data[0]["MOBILE_LABEL"] = short_label

                tempt[serializer.data[0].get("SHORT_LABEL")] = serializer.data[0]


class ResourceTypesDetailView(generics.CreateAPIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        queryset = resources_types.objects.filter(ROW_ID=request.data.get("ROW_ID"))
        validate_find(queryset, request)
        serializer = ResourceTypesDetailsSerializer(queryset, many=True)
        return Response(
            {"Message": "successful", "BODY": serializer.data},
            status=status.HTTP_200_OK,
        )


class ResourceTypesEditorTreeMenuView(generics.CreateAPIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        queryset = resources_types.objects.filter(
            CULTURE=request.data.get("CULTURE")
        ).distinct("PARENT")
        validate_find(queryset, request)
        serializer = ResourceTypesDetailsSerializer(queryset, many=True)

        sorted_list = sorted(list(serializer.data), key=lambda d: str(d["PARENT"]))
        return Response(
            sorted_list,
            status=status.HTTP_200_OK,
        )


class ResourceTypesEditorHierarchyView(generics.CreateAPIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        queryset = resources_types.objects.filter(
            CULTURE=request.data.get("CULTURE"), PARENT=request.data.get("PARENT")
        )
        validate_find(queryset, request)
        serializer = ResourceTypesDetailsSerializer(queryset, many=True)
        for index in range(len(serializer.data)):
            spliter = (
                serializer.data[index]
                .get("ID")
                .split(str(request.data.get("PARENT")) + ".")
            )
            if len(spliter) > 1:
                serializer.data[index]["ID"] = spliter[1]

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
