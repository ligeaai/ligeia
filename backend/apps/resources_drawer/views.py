from django.shortcuts import render
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import ResourceDrawerSaveSerializer,ResourceDrawerDetailsSerializer
from .models import resources_drawer
from services.parsers.addData.type import typeAddData
from django.db.models import Q
from apps.type.models import type as Type
from apps.resource_list.models import resource_list


class ResourceDrawerSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        validate_model_not_null(request.data, "resources_drawer", request)
        serializer = ResourceDrawerSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.create(request.data)
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class ResourceDrawerScriptView(generics.CreateAPIView):

    serializer_class = ResourceDrawerSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        for item in request.data.get('ITEMS'):
            if "NULL" in item:
                for key in my_dict:
                    if my_dict[key] is "“NULL”":
                        my_dict[key] = None
            serializer = ResourceDrawerSaveSerializer(data=item)
            serializer.is_valid()
            serializer.create(item)
        return Response({"Message": "Succsessfull"}, status=status.HTTP_200_OK)




class DrawerView(generics.CreateAPIView):
    serializer_class = ResourceDrawerDetailsSerializer
    permission_classes = [permissions.AllowAny]
    def _get_Queryset(self,id):
        return resources_drawer.objects.filter(
                Q(ID=id) & Q(CULTURE=self.culture) & Q(HIDDEN=False)
            ).order_by("SORT_ORDER")
    
    def _filter_role(self,data,request):
        filtered = []
        test = {}
        for value in data:
            parent = value.get('PARENT')
            if parent in self.roles:
                if not request.role[parent]['READ']:
                    print(parent," NO Permissions")
                    continue
            filtered.append(value)
        return filtered
    
    def _resources_drawer(self,serializer,tempt):
        for index, value in enumerate(serializer.data):
            id = (value.get('PARENT'))
            if len(id.split('.'))>1:
                info = id.split('.')[1]
                if info == "OG_STD":
                    type_qs = ((Type.objects.filter(LAYER_NAME=info)
                                            .values('LABEL_ID',"TYPE")))
                    id_list = [item['LABEL_ID'] for item in type_qs]
                    type_list = [item['TYPE'] for item in type_qs]
                    for layer in self.layers:
                        id_list.remove(layer)
                else:
                    id_list = [id]
                    type_qs = (Type.objects.filter(LABEL_ID__in=id_list)
                                .values('LABEL_ID',"TYPE"))
                    id_list = [item['LABEL_ID'] for item in type_qs]
                    type_list = [item['TYPE'] for item in type_qs]
                    self.layers.append(id)
                
                qs = resource_list.objects.filter(
                            Q(ID__in=id_list) & Q(CULTURE=self.culture) & Q(HIDDEN=False)
                            ).order_by("SHORT_LABEL")
                
                serializer = ResourceDrawerDetailsSerializer(qs, many=True)
                for data in (serializer.data):
                    label = data.get('SHORT_LABEL')
                    id = data.get('ID')
                    for types in type_qs:
                        if types.get('LABEL_ID') == id:
                            data['TYPE'] = types.get('TYPE')
                        
                    if data.get('SHORT_LABEL') == None:
                        label = data.get('MOBILE_LABEL')
                    
                    tempt[label] = data
        return tempt

    def _filtered_process(self,item,data,request,tempt):
        filtered_data = self._filter_role(list(data),request)
        filtered_data = {
                        item["SHORT_LABEL"]: {
                            **item
                        } for item in filtered_data
                    }
        item["Items"] = filtered_data
        if tempt:
            item["Items"]= tempt
        return item

    def _process(self,queryset,item,request):
        if queryset:
            serializer = ResourceDrawerDetailsSerializer(queryset, many=True)
            tempt = {}
            tempt = self._resources_drawer(serializer,tempt)

            self._getChild(serializer.data,request)
            parent_label = item.get("SHORT_LABEL")
            self.new_dict[parent_label] =self._filtered_process(
                                                                    item,
                                                                    serializer.data,
                                                                    request,
                                                                    tempt)
        elif item.get("ID") == "drawerMenu":
            parent_label = item.get("SHORT_LABEL")
            self.new_dict[parent_label] = item
    
    def _getChild(self, data,request):
        for item in data:
            id = item.get("PARENT")
            queryset = self._get_Queryset(id)
            self._process(queryset,item,request)

    def post(self, request, *args, **kwargs):
        self.culture = request.data.get('CULTURE')
        self.layers = []
        self.roles = []
        if request.role:
            self.roles = request.role.keys()
        queryset = resources_drawer.objects.filter(
            Q(ID="drawerMenu")
            & Q(CULTURE=self.culture)
            & Q(HIDDEN=False)
        ).order_by("SORT_ORDER")
        
        serializer = ResourceDrawerDetailsSerializer(queryset, many=True).data
        self.new_dict = dict()
        serializer = self._filter_role(serializer ,request)
        self._getChild(serializer,request)
        new_dict_copy = self.new_dict.copy()
        for keys,value in new_dict_copy.items():
            if not value.get('ID') == "drawerMenu":
                del self.new_dict[keys]
            if value.get('Items') == {}:
                del self.new_dict[keys]
                
        return Response(self.new_dict, status=status.HTTP_200_OK)

