import pandas as pd
import requests
import json

def create_type_data(paramaters):
    url = 'http://localhost:8000/api/v1/type/save/'
    dataset = pd.read_csv('/django/backend/apps/parsers/addData/type/'+paramaters+'.csv')
    dataset=dataset.fillna(0)
    for index in range(0,dataset.shape[0]):
        data = dataset.iloc[index,0:-1]
        data = data.to_dict()
        headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
        if paramaters == 'TYPE':
            data['LAST_UPDT_DATE'] = data.get('LAST_UPDT_DATE').split(' ')[0]
            data['HIDDEN'] = str(data.get('HIDDEN'))
        else:
            data = {
                "TYPE": "123",
        "PROPERTY_NAME": "1",
        "PROP_GRP": "123",
        "PROP_GRP_PRNT": "123",
        "LABEL_ID": "123",
        "TABLE_NAME": "123",
        "COLUMN_NAME": "123",
        "PROPERTY_TYPE": "123",
        "PROPERTY_CLASS": "123",
        "UNICODE": "123",
        "CODE_LIST": "123",
        "CODE_LIST_FLTR": "123",
        "CODE_LIST_LVL": "123",
        "PARENT_CL_PROP": "123",
        "VALUE_FILTER": "123123123123123",
        "UI_EDIT_CLASS": "123",
        "SORT_ORDER": "123",
        "MANDATORY": "123",
        "HIDDEN": "123",
        "IS_KEY": "123",
        "LENGTH": "123.000000000000",
        "DECIMALS": "123.000000000000",
        "UOM": "123",
        "CHANGE_INTERVAL": "123",
        "DEFAULT_VALUE": "123",
        "LAYER_NAME": "123",
        "DESCRIPTION_ID": "123",
        "LAST_UPDT_USER": "123",
        "LAST_UPDT_DATE": "2000-03-12",
        "VERSION": "123",
        "DB_ID": "123",
        "ROW_ID": "1231",
        "STATUS": "23",
        "REV_GRP_ID": "123",
        "PROP_UNIQUE": "123",
        "ALLOW_MULTI_EDIT": "123",
        "DEF_ACCUM_FUNC": "123"
            }
        requests.post(url,json.dumps(data),headers=headers)

