import time  
from numpy import r_
import pandas as pd
import numpy as np
import requests
import json

def create_type_data():
    url = 'http://localhost:8000/api/v1/type/save/'

    dataset = pd.read_csv('/django/backend/services/parsers/addData/type/type.csv')
    dataset=dataset.fillna(0)
    for index in range(0,dataset.shape[0]):
        data = dataset.iloc[index,0:-1]
        data = data.to_dict()
        headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
        data['LAST_UPDT_DATE'] = data.get('LAST_UPDT_DATE').split(' ')[0]
        data['HIDDEN'] = str(data.get('HIDDEN'))
   
        requests.post(url,json.dumps(data),headers=headers)

def create_type_property_data():
    url = 'http://localhost:8000/api/v1/type-property/save/'

    dataset = pd.read_csv('/django/backend/services/parsers/addData/type/TYPE_PROPERTY.csv')
    dataset=dataset.fillna(0)
    for index in range(0,dataset.shape[0]):
        data = dataset.iloc[0,0:-1]
        data = data.to_dict()
        headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
        data['LAST_UPDT_DATE'] = data.get('LAST_UPDT_DATE').split(' ')[0]
        data['HIDDEN'] = str(data.get('HIDDEN'))
        for keys,value in data.items():
            if type(value) == type(float(5)):
                data[keys] = int(value)
        data = {"TYPE":data.get('TYPE'),
                    "PROPERTY_NAME": data.get('PROPERTY_NAME'),
                    "PROP_GRP": data.get('PROP_GRP'),
                    "PROP_GRP_PRNT": data.get('PROP_GRP_PRNT'),
                    "LABEL_ID": data.get('LABEL_ID'),
                    "TABLE_NAME": data.get('TABLE_NAME'),
                    "COLUMN_NAME": data.get('COLUMN_NAME'),
                    "PROPERTY_TYPE": data.get('PROPERTY_TYPE'),
                    "PROPERTY_CLASS": data.get('PROPERTY_CLASS'),
                    "UNICODE": str(data.get('UNICODE')),
                    "CODE_LIST": data.get('CODE_LIST'),
                    "CODE_LIST_FLTR": data.get('CODE_LIST_FLTR'),
                    "CODE_LIST_LVL": int(data.get('CODE_LIST_LVL')),
                    "PARENT_CL_PROP":data.get('PARENT_CL_PROP'),
                    "VALUE_FILTER": data.get('VALUE_FILTER'),
                    "UI_EDIT_CLASS": data.get('VALUE_FILTER'),
                    "SORT_ORDER": int(data.get('SORT_ORDER')),
                    "MANDATORY": str(data.get('MANDATORY')),
                    "HIDDEN": str(data.get('HIDDEN')),
                    "IS_KEY": str(data.get('IS_KEY')),
                    "LENGTH": int(data.get('LENGTH')),
                    "DECIMALS": int(data.get('DECIMALS')),
                    "UOM": data.get('UOM'),
                    "CHANGE_INTERVAL":data.get('CHANGE_INTERVAL'),
                    "DEFAULT_VALUE": data.get('DEFAULT_VALUE'),
                    "LAYER_NAME": data.get('LAYER_NAME'),
                    "DESCRIPTION_ID": data.get('DESCRIPTION_ID'),
                    "LAST_UPDT_USER": data.get('LAST_UPDT_USER'),
                    "LAST_UPDT_DATE": data.get('LAST_UPDT_DATE'),
                    "VERSION": data.get('VERSION'),
                    "DB_ID": data.get('DB_ID'),
                    "ROW_ID": data.get('ROW_ID'),
                    "STATUS": data.get('STATUS'),
                    "REV_GRP_ID": data.get('REV_GRP_ID'),
                    "PROP_UNIQUE": data.get('PROP_UNIQUE'),
                    "ALLOW_MULTI_EDIT": data.get('ALLOW_MULTI_EDIT'),
                    "DEF_ACCUM_FUNC": data.get('DEF_ACCUM_FUNC')}
        requests.post(url,json.dumps(data),headers=headers)
        time.sleep(0.1)


