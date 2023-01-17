from django.shortcuts import render
from rest_framework import generics,permissions,status
from rest_framework.response import Response 
from .models import item_link
from .serializers import ItemLinkSaveSerializer,ItemLinkDetailsSerializer
from utils.models_utils import validate_find
from apps.item_property.models import item_property 
from utils.models_utils import validate_model_not_null
from apps.item_property.serializers import ItemPropertyNameSerializer
from django.db.models import Q
from apps.tags.models import tags
from apps.item.models import item
from apps.item.serializers import ItemDetailsSerializer
from apps.tags.serializers import TagsDetiailsSerializer
# Create your views here.


class ItemLinkSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        validate_model_not_null(request.data,"ITEM_LINK",request = request)
        serializer = ItemLinkSaveSerializer(data = request.data)
        serializer.is_valid()
        serializer.save(request.data)
        return Response("Created SUCCSESFUL",status=status.HTTP_201_CREATED)

class ItemLinkCardinaltyView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if request.data.get('FROM_ITEM_ID'):
            quaryset  = item_link.objects.filter(FROM_ITEM_ID=request.data.get('FROM_ITEM_ID'),TO_ITEM_TYPE = request.data.get('TO_ITEM_TYPE'),LINK_TYPE = request.data.get('LINK_TYPE'), )
        else:
            quaryset  = item_link.objects.filter(TO_ITEM_ID=request.data.get('TO_ITEM_ID'),FROM_ITEM_TYPE = request.data.get('FROM_ITEM_TYPE'),LINK_TYPE = request.data.get('LINK_TYPE'), )
        if quaryset:
            return Response(True,status=status.HTTP_200_OK)
        else:
            return Response(False,status=status.HTTP_400_BAD_REQUEST)
        
        

class ItemLinkDetailsView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        tempt = []
        quaryset  = item_link.objects.filter(TO_ITEM_ID = request.data.get("ID"))
        quaryset2  = item_link.objects.filter(FROM_ITEM_ID = request.data.get("ID"))
        # validate_find(quaryset,request)
        serializer = ItemLinkDetailsSerializer(quaryset,many = True)
        serializer2 = ItemLinkDetailsSerializer(quaryset2,many = True)
        data1 = self._getFromItemName(serializer.data,request)
        data2 = self._getFromItemName(serializer2.data,request)
        new_dict = {
            "TO_ITEM_ID":data1,
            "FROM_ITEM_ID":data2
        }
        return Response(new_dict,status=status.HTTP_200_OK)
    
    
    def _getFromItemName(self,data,request):
        try:
            for index in range(len(data)):
                item = data[index]
                propertys = item_property.objects.filter(ITEM_ID = item.get('FROM_ITEM_ID'),PROPERTY_TYPE = 'NAME').order_by('START_DATETIME')
                property2 = item_property.objects.filter(ITEM_ID = item.get('TO_ITEM_ID'),PROPERTY_TYPE = 'NAME').order_by('START_DATETIME')
                tag_name = tags.objects.filter(TAG_ID = item.get('FROM_ITEM_ID'))
                # validate_find(property,request)
                serializer = ItemPropertyNameSerializer(propertys,many = True)
                serializer2 = ItemPropertyNameSerializer(property2,many = True)
                if propertys:
                    data[index]['FROM_ITEM_NAME'] = serializer.data[0].get('PROPERTY_STRING')
                if property2:
                    data[index]['TO_ITEM_NAME'] = serializer2.data[0].get('PROPERTY_STRING')
                if tag_name: #SEE TAG NAME IF ITEM IS NOT IN PROPERTY
                    data[index]['FROM_ITEM_NAME'] = TagsDetiailsSerializer(tag_name,many = True).data[0].get('NAME')

            return data
        except Exception as e:
            raise e

class ItemLinkUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]
    def put(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(LINK_ID = request.data.get("LINK_ID"))
        validate_find(quaryset,request)
        quaryset.update(**request.data)
        return Response("Succsesful",status=status.HTTP_200_OK)


    # def _getChild(self,data,tempt):
    #     for index in range(len(data)):
    #         quaryset_from = item_property.objects.filter(ITEM_ID = data[index].get('FROM_ITEM_ID'),PROPERTY_TYPE = 'NAME').order_by('START_DATETIME')
    #         quaryset_to = item_property.objects.filter(ITEM_ID = data[index].get('TO_ITEM_ID'),PROPERTY_TYPE = 'NAME').order_by('START_DATETIME')
    #         serializer_from = ItemPropertyNameSerializer(quaryset_from,many = True)
    #         serializer_to = ItemPropertyNameSerializer(quaryset_to,many = True)
    #         if quaryset_from:
    #             data[index]['FROM_ITEM_NAME'] = serializer_from.data[0].get("PROPERTY_STRING")
    #         if quaryset_to:
    #             data[index]['TO_ITEM_NAME'] = serializer_to.data[0].get("PROPERTY_STRING")
    #         quaryset  = item_link.objects.filter(TO_ITEM_TYPE = data[index].get('FROM_ITEM_TYPE'))
    #         if quaryset:
    #             serializer = ItemLinkDetailsSerializer(quaryset,many = True)
    #             data[index]['CHILD'] = serializer.data
    #             self._getChild(serializer.data,tempt)
        



class ItemLinkDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(LINK_ID = request.data.get("LINK_ID"))
        validate_find(quaryset,request)
        quaryset.delete()
        return Response("Deleted SUCCSESFUL",status=status.HTTP_200_OK)


class TagsLinksView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(Q(TO_ITEM_ID = request.data.get('ID')),~Q(LINK_TYPE='TAG_ITEM'))
        if not quaryset:
            quaryset  = item_link.objects.filter(Q(FROM_ITEM_ID= request.data.get('ID')),~Q(LINK_TYPE='TAG_ITEM'))
            
        tempt ={}
        tagsList = []
        serializer = ItemLinkDetailsSerializer(quaryset,many = True)
        self._getChild(serializer.data,tempt,tagsList)
        return Response(tagsList)
    
    
    def _getChild(self,data,tempt,tagsList):
        for index in range(len(data)):
            print('girdi')
            quaryset  = item_link.objects.filter(Q(TO_ITEM_ID = data[index].get('FROM_ITEM_ID')),~Q(LINK_TYPE='TAG_ITEM'))
            if quaryset:
                serializer = ItemLinkDetailsSerializer(quaryset,many = True)
                data[index]['CHILD'] = serializer.data
                self._getChild(serializer.data,tempt,tagsList)
                find_tags = tags.objects.filter(ITEM_ID = data[index].get('TO_ITEM_ID'))
                if find_tags:
                    for item in TagsDetiailsSerializer(find_tags,many=True).data:
                        tagsList.append(item)
                        
                
            else:
                find_tags = tags.objects.filter(ITEM_ID = data[index].get('FROM_ITEM_ID'))
                if find_tags:
                    for item in TagsDetiailsSerializer(find_tags,many=True).data:
                        tagsList.append(item)
                        
                
            #    new_dict = {
            #     'TO_ITEM_NAME':data[index].get('FROM_ITEM_NAME'),
            #     "TO_ITEM_ID": data[index].get('FROM_ITEM_ID'),
            #     "TO_ITEM_TYPE": data[index].get('FROM_ITEM_TYPE'),
            #    }
            #    data[index]['CHILD'] = [new_dict]
class ItemLinkHierarchyView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        pass

    def get(self, request, *args, **kwargs):
        itemqs = item.objects.filter(ITEM_TYPE ='COMPANY')
            # return Response(data[index])
        tempt = {}
        serializer = ItemDetailsSerializer(itemqs,many = True)
        for index in range(len(serializer.data)):
            serializer.data[index]['FROM_ITEM_ID'] = serializer.data[index].get('ITEM_ID')
            serializer.data[index]['LINK_ID'] = serializer.data[index].get('ITEM_ID')
        self._getChild(serializer.data,tempt)
        return Response(serializer.data)
    
    def _getChild(self,data,tempt):
        for index in range(len(data)):
            self._getName(data[index])
            quaryset  = item_link.objects.filter(Q(TO_ITEM_ID = data[index].get('FROM_ITEM_ID')),~Q(LINK_TYPE='TAG_ITEM'))
            if quaryset:
                serializer = ItemLinkDetailsSerializer(quaryset,many = True)
                data[index]['CHILD'] = serializer.data
                self._getChild(serializer.data,tempt)
                
            else:
               new_dict = {
                'FROM_ITEM_NAME':data[index].get('FROM_ITEM_NAME'),
                "FROM_ITEM_ID": data[index].get('FROM_ITEM_ID'),
                "LINK_ID": data[index].get('FROM_ITEM_ID'),
                "FROM_ITEM_TYPE": data[index].get('FROM_ITEM_TYPE'),
               }
               data[index]['CHILD'] = [new_dict]
               
                

    def _getName(self,data):
            quaryset_from = item_property.objects.filter(ITEM_ID = data.get('FROM_ITEM_ID'),PROPERTY_TYPE = 'NAME').order_by('START_DATETIME')
            quaryset_to = item_property.objects.filter(ITEM_ID = data.get('TO_ITEM_ID'),PROPERTY_TYPE = 'NAME').order_by('START_DATETIME')
            serializer_from = ItemPropertyNameSerializer(quaryset_from,many = True)
            serializer_to = ItemPropertyNameSerializer(quaryset_to,many = True)
            if quaryset_from:
                data['FROM_ITEM_NAME'] = serializer_from.data[0].get("PROPERTY_STRING")
            if quaryset_to:
                data['TO_ITEM_NAME'] = serializer_to.data[0].get("PROPERTY_STRING")
