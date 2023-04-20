from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import RolesSaveSerializer,RolesSaveAndUpdatePropertySaveSerializer,RolesPropertySerializer
from .models import roles
from apps.roles_property.models import roles_property
from apps.roles_property.serializers import RolesPropertySaveSerializer
from django.db import transaction
from utils.models_utils import (
    validate_find,
)
from utils.utils import import_data


class RolesSaveView(generics.GenericAPIView):
    serializer_class = RolesSaveAndUpdatePropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def save_roles(self,request):
        data = request.data.get('ROLES')
        data['PROPERTY_ID'] = self.property_list
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            roles = serializer.save(data)
    
    def save_rolesProperty(self,request):
        for props in request.data.get('PROPERTY'):
            # props['ROLES_ID'] = [request.data.get('ROLES').get('ROLES_ID')]
            self.property_list.append(props.get('ROW_ID'))
            serializer = RolesPropertySaveSerializer(data=props)
            if serializer.is_valid():
                roles_property = serializer.save(props)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            self.property_list = []
            self.save_rolesProperty(request)
            try:
                print(self.property_list)
                self.save_roles(request)
            except Exception as e:
                transaction.set_rollback(True)
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
                     
            return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)

class RolesScriptView(generics.GenericAPIView):
    serializer_class = RolesPropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        message = import_data(roles,"roles",is_relationship = True)
        return Response({"Message":message}, status=status.HTTP_200_OK)


class RolesGetView(generics.GenericAPIView):
    serializer_class = RolesSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            queryset = roles.objects.all().order_by('ROLES_NAME')
            serializer = self.get_serializer(queryset,many = True)
            return Response(serializer.data)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class RolesDeleteView(generics.GenericAPIView):
    serializer_class = RolesSaveAndUpdatePropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            roles_id = request.data.get('ROLES_ID')
            queryset = roles.objects.get(ROLES_ID = roles_id)
            validate_find(queryset)
            try:
                queryset.PROPERTY_ID.remove()
                queryset.delete()
            except Exception as e:
                transaction.set_rollback(True)
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)
                
                


class RolesGetPropertyView(generics.GenericAPIView):
    serializer_class = RolesPropertySerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            roles_id = request.data.get('ROLES_ID')
            queryset = roles.objects.filter(ROLES_ID = roles_id)
            print(queryset)
            serializer = self.get_serializer(queryset,many = True)
            return Response(serializer.data)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)