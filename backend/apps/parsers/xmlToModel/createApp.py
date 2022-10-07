import adapter
from xmlInfo import IxmlInfo
import os
import environ

settingspath = '/django/backend/settings/localapp.py'
xmlpath = '/django/backend/apps/parsers/config/resources/xml/'
modeltypelist = ['CODE_LIST','ITEM','ITEM_LINK','TYPE_PROPERTY','TYPE_LINK','ITEM_PROPERTY','TYPE','RESOURCE_LIST','TYPE_UOM','ITEM_VERSION','LAYER']

for item in modeltypelist:
    xmlinfo = IxmlInfo(item,'Columns','DbInfo.xml','Tables',xmlpath,settingspath)
    adapter.create_database_model(xmlinfo)
    #os.chdir('/django/backend/apps/scripts')




