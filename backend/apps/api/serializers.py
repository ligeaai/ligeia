from dataclasses import fields
from pyexpat import model
from rest_framework import serializers

from apps.code_list.models.code_list import code_list


class code_listserializers(serializers.ModelSerializer):
    class Meta:
        model = code_list
        # fields = ('LISTTYPE','CULTURE','CODE','CODETEXT','PARENT','LEGACYCODE',
        #         'VAL1','VAL2','VAL3','VAL4','VAL5','VAL6','VAL7','VAL8','VAL9','VAL10',
        #         'DATE1','DATE2','DATE3','DATE4','DATE5','CHAR1','CHAR2','CHAR3','CHAR4','CHAR5',
        #         'LAYER_NAME','DESCRIPTION_ID','HIDDEN','LAST_UPDT_USER','LAST_UPDT_DATE','VERSION',
        #         'DB_ID','ROW_ID','STATUS','REV_GRP_ID')
        fields = "__all__"
