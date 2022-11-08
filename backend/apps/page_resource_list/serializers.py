import uuid
from rest_framework import serializers
from .models import page_resource_list

class PageResourceListDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = page_resource_list
        fields = ['MODEL','CULTURE','SHORT_LABEL','PARENT','ICON','TITLE','URL']

class PageResourceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = page_resource_list
        fields = '__all__'

    def create(self, validated_data):
        validated_data['ROW_ID'] = uuid.uuid4().hex
        psl = page_resource_list.objects.create(**validated_data)
        psl.save()
        return psl


class PageResourceListDrawerSerializer(serializers.Serializer):
    def save(self, validated_data):
        psld = dict()
        types = validated_data.data.get('TYPE')
        label = list(str(types.get('TYPE')).lower())
        label[0] = str(label[0]).upper()
        psld["CULTURE"] = validated_data.data.get('CULTURE')
        psld["ID"] = "TYPE."+str(types.get('TYPE'))
        psld["ROW_ID"] = uuid.uuid4().hex
        psld["SHORT_LABEL"] = str().join(label)
        psld["MODEL"] = "drawerMenu"
        psld["PARENT"] = "Items"
        psld["TITLE"] = str().join(label)
        psld["ICON"] = ""
        psld["URL"] = "/#"
        qs = page_resource_list.objects.filter(PARENT = psld.get('PARENT'),SHORT_LABEL = psld.get('SHORT_LABEL'))
        if qs:
            qs.update(**psld)
        else:
            drawer = page_resource_list.objects.create(**psld)
            drawer.save()
            return True