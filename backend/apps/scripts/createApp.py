import adapter
from xmlInfo import IxmlInfo
import os
import environ

xmlpath = '/django/backend/apps/parsers/xml/'
settingspath = '/django/backend/settings/localapp.py'

modeltypelist = ['CODE_LIST','ITEM','ITEM_LINK','TYPE_PROPERTY','TYPE_LINK','ITEM_PROPERTY','TYPE','RESOURCE_LIST','TYPE_UOM','ITEM_VERSION']

for item in modeltypelist:
    xmlinfo = IxmlInfo(item,'Columns','DbInfo.xml','Tables',xmlpath,settingspath)
    adapter.create_database_model(xmlinfo)
    os.chdir('/django/backend/apps/scripts')




