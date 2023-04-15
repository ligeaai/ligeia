import uuid

from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from apps.templates.orm_CodeList import CodeListORM
from services.logging.Handlers import KafkaLogger
from services.parsers.addData.type import typeAddData
from utils.utils import redisCaching as Red
# Create your views here.
from .models import code_list
from .serializers import (
    CodeListDetailsSerializer,
    CodeListCustomSerializer,
    CodeListSaveSerializer,
    CodeListDeleteSerializer,
    CodeListCustomNewSerializer,
)
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from utils.models_utils import (
    validate_model_not_null,
    null_value_to_space,
    validate_find,
)
from utils.permissions.admin import CreatePermission,ReadPermission,UpdatePermission,DeletePermission
create_per = CreatePermission(model_type="CODE_LIST")
read_per = CreatePermission(model_type="CODE_LIST")
update_per = CreatePermission(model_type="CODE_LIST")
delete_per = CreatePermission(model_type="CODE_LIST")
logger = KafkaLogger()


class CodeListSaveScriptView(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = [permissions.AllowAny,create_per]
    serializer_class = CodeListSaveSerializer

    def create(self, request, *args, **kwargs):
        del request.data['HIERARCHY']
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"Message": "Successful"}, status=status.HTTP_200_OK)

class CodeListUpdateView(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = [permissions.AllowAny,update_per]
    serializer_class = CodeListSaveSerializer

    def post(self, request, *args, **kwargs):
        del request.data['HIERARCHY']
        serializer = CodeListSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(request.data)
        # Red.delete(str(request.user) + request.data.get("HIERARCHY")[0])
        return Response({"Message": "Succsessful"}, status=status.HTTP_200_OK)


class CodeListSaveAndUpdateNewView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]

    def put(self, request, *args, **kwargs):

        serializer = CodeListCustomNewSerializer(data=request.data)
        serializer.is_valid()
        message = serializer.save(request)
        logger.info(request=request, message="message")
        Red.delete(str(request.user) + request.data.get("HIERARCHY")[0])
        return Response({"Message": "message"}, status=status.HTTP_200_OK)


class CodeListSaveAndUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]

    def put(self, request, *args, **kwargs):

        serializer = CodeListCustomSerializer(data=request.data)
        Red.delete(str(request.user) + request.data.get("HIERARCHY")[0])
        serializer.is_valid()
        message = serializer.save(request)
        logger.info(request=request, message=message)

        return Response({"Message": message}, status=status.HTTP_200_OK)


class CodeListCultureView(generics.ListAPIView):
    serializer_class = CodeListSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        queryset = code_list.objects.filter(LIST_TYPE="CULTURES")
        serializer = CodeListDetailsSerializer(queryset, many=True)
        return Response({"Message": serializer.data}, status=status.HTTP_200_OK)


class CodeListWIDGET_TYPEView(generics.ListAPIView):
    serializer_class = CodeListSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        queryset = code_list.objects.filter(LIST_TYPE="WIDGET_TYPE")
        serializer = CodeListDetailsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CodeListView(generics.ListAPIView):
    serializer_class = CodeListSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        typeAddData.import_data("CODE_LIST")
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class CodeListParentView(generics.CreateAPIView):
    serializer_class = CodeListDetailsSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [read_per]

    def post(self, request, *args, **kwargs):
        list_types = "CODE_LIST"
        culture = request.data.get("CULTURE")
        print(request.user)
        cache_key = str(request.user) + list_types + culture
        queryset = code_list.objects.filter(
            LIST_TYPE=list_types,
            CULTURE=culture,
        ).order_by('CODE_TEXT')
        validate_find(queryset, request=request)
        serializer = CodeListDetailsSerializer(queryset, many=True)
        serializer = null_value_to_space(serializer.data, request=request)
        logger.info(request=request, message="Code list details only one fields")
        # sorted_list = sorted(list(serializer), key=lambda d: d["CODE_TEXT"])
        Red.set(cache_key, serializer)
        return Response(serializer, status=status.HTTP_200_OK)


class CodeListDetailView(generics.CreateAPIView):

    serializer_class = CodeListDetailsSerializer
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):

        if request.data.get("ROW_ID"):
            cache_key = str(request.user) + request.data.get("ROW_ID")

        cache_data = Red.get(cache_key)

        if cache_data:
            logger.info(request=request, message="Code list details")
            return Response(cache_data, status=status.HTTP_200_OK)

        queryset = code_list.objects.filter(
            ROW_ID=request.data.get("ROW_ID"),
        )

        validate_find(queryset, request=request)
        serializer = CodeListDetailsSerializer(queryset, many=True)
        serializer = null_value_to_space(serializer.data, request=request)
        logger.info(request=request, message="Code list details only one fields")
        # Red.set(cache_key, serializer)
        return Response(serializer, status=status.HTTP_200_OK)


class CodeListDeleteChildView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        message = "Codelist deletion successful"
        try:
            rowIdList = request.data.get("ROW_ID")
            for value in rowIdList:
                queryset = code_list.objects.filter(ROW_ID=value)
                validate_find(queryset, request=request)
                queryset.delete()
                logger.info(request=request, message=message)
                Red.delete(request.data + value)
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(
                request=request, message=message, error=str(ValidationError(e))
            )
            raise ValidationError(e)


class CodeListParentDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        message = "Codelist Parent deletion successful"
        try:
            queryset = code_list.objects.filter(ROW_ID=request.data.get("ROW_ID"))
            validate_find(queryset, request=request)

            serializer = CodeListDeleteSerializer(queryset, many=True)
            list_types = serializer.data[0].get("LIST_TYPE")
            culture = serializer.data[0].get("CULTURE")
            cache_key = str(request.user) + list_types + culture
            self._delete_child(serializer.data)
            logger.info(request=request, message=message)
            Red.delete(str(request.user) + request.data.get("ROW_ID"))
            Red.delete(cache_key)
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(
                request=request, message=message, error=str(ValidationError(e))
            )
            raise ValidationError(e)

    def _delete_child(self, data):
        for item in data:
            queryset = code_list.objects.filter(ROW_ID=item.get("ROW_ID"))
            serializer = CodeListDetailsSerializer(queryset, many=True)
            child_data = serializer.data
            queryset.delete()
            CodeListORM.getCodeList()
        return True


class CodeListDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny,delete_per]

    def post(self, request, *args, **kwargs):
        message = "Codelist deletion successful"
        try:
            qs = code_list.objects.filter(ROW_ID=request.data.get("ROW_ID"))
            validate_find(qs, request=request)
            qs.delete()
            logger.info(request=request, message=message)
            Red.delete(str(request.user) + request.data.get("ROW_ID"))
            return Response(message, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(
                request=request, message=message, error=str(ValidationError(e))
            )
            raise ValidationError(e)


class CodeListDeepDetailView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny,read_per]

    def post(self, request, *args, **kwargs):

        cache_key = str(request.user) + request.data.get("ROW_ID")
        cache_data = Red.get(cache_key)
        if cache_data:
            logger.info(
                request=request,
                message="Code list deep details (Parent-Child Relationship)",
            )
            return Response(cache_data, status=status.HTTP_200_OK)

        queryset = code_list.objects.filter(ROW_ID=request.data.get("ROW_ID"))
        validate_find(queryset, request)
        serializer = CodeListDetailsSerializer(queryset, many=True)
        respons_value = []
        culture = serializer.data[0].get("CULTURE")
        respons_value = CodeListORM.getCodeList(
            queryset, culture=culture, hierarchy=True
        )
        respons_value = null_value_to_space(respons_value, request)
        # Red.set(cache_key, respons_value)
        logger.info(
            request=request,
            message="Code list deep details (Parent-Child Relationship)",
        )
        return Response(respons_value, status=status.HTTP_200_OK)

    # def _get_child(self, data,respons_value,index,parent):
    #     for item in data:
    #         childItem = []
    #         if parent is not None:
    #             for data in parent:
    #                 childItem.append(data)

    #         childItem.append(item.get('ROW_ID'))

    #         item['HIERARCHY'] = childItem

    #         if index == 0:
    #             respons_value.append(item)

    #         queryset = code_list.objects.filter(
    #                 LIST_TYPE=item.get("CODE"),
    #                 CULTURE=item.get("CULTURE")
    #             )
    #         serializer = CodeListDetailsSerializer(queryset, many=True)
    #         self._get_child(serializer.data,respons_value,1,childItem)
    #     return respons_value

    # def _get_child(self, data,respons_value,index,parent):
    #     print(respons_value)
    #     for item in data:

    #         childItem = []
    #         if parent is not None :
    #             childItem.append(parent)
    #         if index == 1:
    #             childItem.append(item.get('ROW_ID'))

    #         item['HIERARCHY'] = childItem
    #         if item.get('LIST_TYPE') != 'CODE_LIST':
    #             respons_value.append(item)

    #         if index == 0:
    #             respons_value.append(item)
    #         queryset = code_list.objects.filter(
    #         LIST_TYPE=item.get("CODE"), CULTURE=item.get("CULTURE")
    #         )
    #         serializer = CodeListDetailsSerializer(queryset, many=True)
    #         self._get_child(serializer.data,respons_value,1,childItem[0])
    #     return respons_value


class CodeListTypeDetailView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        culture = request.data.get("CULTURE")
        queryset = code_list.objects.filter(
            LIST_TYPE=request.data.get("CODE_LIST"), CULTURE=culture
        )
        print(queryset)
        child_code = CodeListORM.getCodeList(queryset, culture=culture, hierarchy=False)
        return Response(child_code, status=status.HTTP_200_OK)
