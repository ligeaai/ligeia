from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import type_link
from services.parsers.addData.type import typeAddData
from apps.resource_list.models import resource_list
from apps.type.models import type as Type
from apps.type.serializers import TypeResourceListManagerSerializer
from apps.resource_list.serializers import ResourceListDetailsSerializer
from .serializers import (
    TypeLinkSaveSerializer,
    TypeLinkDetailsSerializer,
    TypeLinkDetails2Serializer,
)
from django.db.models import Q
from utils.models_utils import validate_model_not_null, validate_find

# Create your views here.
class TypeLinkSaveView(generics.CreateAPIView):
    serializer_class = TypeLinkDetails2Serializer
    permission_classes = [permissions.AllowAny]
    # def create(self, request, *args, **kwargs):
    #     serializer = TypeLinkSaveSerializer(data = request.data)
    #     serializer.is_valid()
    #     serializer.save(request.data)
    #     return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class TypeLinkView(generics.ListAPIView):
    queryset = type_link.objects.all()
    serializer_class = TypeLinkSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

        typeAddData.import_data("TYPE_LINK")
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class TypeNewLinkSchemasView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):

        type_val = request.data.get("TYPE")
        culture_val = request.data.get("CULTURE")
        new_dict = {}
        target_list = ["TO_TYPE", "FROM_TYPE"]
        for index, item in enumerate(target_list):
            new_dict[item] = []
            target = (
                type_link.objects.filter(Q(**{item: type_val}))
                .values("TYPE", "FROM_TYPE", "TO_TYPE", "ROW_ID")
                .order_by("TYPE")
                .distinct("TYPE")
            )
            types = [str("TYPE.") + target_type.get("TYPE") for target_type in target]
            resource_label = (
                resource_list.objects.filter(
                    ID__in=types,
                    CULTURE=culture_val,
                )
                .values("SHORT_LABEL", "MOBILE_LABEL")
                .order_by("ID")
            )
            for linksProp, resourceProp in zip(target, resource_label):
                new_dict[item].append({**linksProp, **resourceProp})

        return Response(new_dict, status=status.HTTP_200_OK)

    # def _resourceLabel(self):

    #     label_ids =
    #     qs_resources = resource_list.objects.filter(ID__in=label_ids, CULTURE=culture)
    #     resources = {}
    #     for resource in qs_resources:
    #         resources[resource.ID] = {
    #             "SHORT_LABEL": resource.SHORT_LABEL,
    #             "MOBILE_LABEL": resource.MOBILE_LABEL,
    #         }


class TypeLinkDetailsView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):

        obj = {
            "TO_TYPE": Q(TO_TYPE=request.data.get("TYPE")),
            "FROM_TYPE": Q(FROM_TYPE=request.data.get("TYPE")),
        }

        new_dict = dict()
        keys = ["TO_TYPE", "FROM_TYPE"]
        for item in keys:
            types = type_link.objects.filter(obj.get(item))
            validate_find(types, request)
            serializer = TypeLinkDetailsSerializer(types, many=True)
            tempt = []
            for items in serializer.data:
                tempt.append(
                    self._getResourceLabel(
                        items,
                        request.data.get("CULTURE"),
                        items.get("FROM_TYPE"),
                        items.get("TO_TYPE"),
                        items.get("TYPE"),
                    )
                )
            new_dict[item] = tempt

        return Response(new_dict, status=status.HTTP_200_OK)

    def _getResourceLabel(self, data, culture, Fromtypes, ToTypes, linkType):
        qs_FromType = Type.objects.filter(TYPE=Fromtypes)
        FromType_serializer = TypeResourceListManagerSerializer(qs_FromType, many=True)

        from_label_id = ""
        if qs_FromType:
            from_label_id = FromType_serializer.data[0].get("LABEL_ID")

        qs_ToType = Type.objects.filter(TYPE=ToTypes)
        ToType_serializer = TypeResourceListManagerSerializer(qs_ToType, many=True)
        linkType = str("TYPE.") + str(linkType)
        qsLinkType = resource_list.objects.filter(ID=linkType, CULTURE=culture)
        print(linkType)
        resource_list_LinkTypeserialzer = ResourceListDetailsSerializer(
            qsLinkType, many=True
        )

        to_label_id = ""
        if qs_ToType:
            to_label_id = ToType_serializer.data[0].get("LABEL_ID")

        for index in range(len(data)):
            try:
                qsFrom = resource_list.objects.filter(ID=from_label_id, CULTURE=culture)
                resource_list_Fromserialzer = ResourceListDetailsSerializer(
                    qsFrom, many=True
                )
                qsTo = resource_list.objects.filter(ID=to_label_id, CULTURE=culture)
                resource_list_Toserialzer = ResourceListDetailsSerializer(
                    qsTo, many=True
                )
                if qsFrom:
                    data["FROM_SHORT_LABEL"] = resource_list_Fromserialzer.data[0].get(
                        "SHORT_LABEL"
                    )
                    data["FROM_MOBILE_LABEL"] = resource_list_Fromserialzer.data[0].get(
                        "MOBILE_LABEL"
                    )
                if qsTo:
                    data["TO_SHORT_LABEL"] = resource_list_Toserialzer.data[0].get(
                        "SHORT_LABEL"
                    )
                    data["TO_MOBILE_LABEL"] = resource_list_Toserialzer.data[0].get(
                        "MOBILE_LABEL"
                    )
                if qsLinkType:
                    data["TYPE_LABEL"] = resource_list_LinkTypeserialzer.data[0].get(
                        "SHORT_LABEL"
                    )
                return data
            except:
                pass


class RelatedTypeView(generics.CreateAPIView):
    serializer_class = TypeLinkDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        culture_val = request.data.pop("CULTURE")
        type_val = request.data.pop("TYPE")
        change_label = {"FROM_TYPE": "TO_TYPE", "TO_TYPE": "FROM_TYPE"}
        get_label = change_label.get(
            list(request.data.keys())[0]
        )  # FROM OR TO TYPE changed for sorting
        type_items = (
            type_link.objects.filter(TYPE=type_val, **request.data)
            .values(
                "TYPE",
                "FROM_TYPE",
                "FROM_CARDINALITY",
                "TO_TYPE",
                "TO_CARDINALITY",
                "ROW_ID",
            )
            .order_by(get_label)
        )
        types = [target_type.get(get_label) for target_type in type_items]
        target_type = Type.objects.filter(TYPE__in=types).values_list("LABEL_ID")
        resource_label = (
            resource_list.objects.filter(
                ID__in=target_type,
                CULTURE=culture_val,
            )
            .values("SHORT_LABEL", "MOBILE_LABEL")
            .order_by("ID")
        )
        new_dict = []
        for linksProp, resourceProp in zip(type_items, resource_label):
            new_dict.append({**linksProp, **resourceProp})
        return Response(new_dict, status=status.HTTP_200_OK)
