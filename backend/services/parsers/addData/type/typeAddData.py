import json
import time

import numpy as np
import pandas as pd
import requests
from numpy import r_


def import_data(data):
    urlDict = {
        "TYPE_LINK":"type-link",
        "TYPE":"type",
        "TYPE_PROPERTY":"type-property",
        "CODE_LIST":"code-list",
        "RESOURCE_LIST":"resource-list",
        "ITEM_PROPERTY":"item-property",
        "ITEM":"item",
        "LAYER":"layer",
    }
    base_url = "http://localhost:8000/api/v1/"+urlDict.get(data)+"/save/"
    _create_method(base_url,data)
    

def _create_method(url,data):
    dataset = pd.read_csv('/django/backend/services/parsers/addData/type/'+data+'.csv')
    headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
    dataset = dataset.fillna(value='None')
    for index in range(0,dataset.shape[0]):
        data = dataset.iloc[index,0:-1]
        data = data.to_dict()
        try:
            data['LAST_UPDT_DATE'] = data.get('LAST_UPDT_DATE').split(' ')[0]
            if data.get('HIDDEN'):
                data['HIDDEN'] = str(data.get('HIDDEN'))
        except Exception as e:
            print('except', e)
        for keys,value in data.items():
            if value == 'None':
                data[keys] = None
            if type(value) == type(bool(True)):
                data[keys] = str(value)

            if type(value) == type(float(5)):
                data[keys] = int(value)  
    
    
        requests.post(url,json.dumps(data),headers=headers)






def drawerMenuJson():
    with open('/django/backend/services/parsers/addData/type/drawner.json') as json_file:
        data = json.load(json_file)
    child_dict = dict()
    _createMenuTempt(data.get('drawerMenu'),child_dict,parentName=None)
    return (data.get('drawerMenu'))

def _createMenuTempt(data,child_dict,parentName):
     model = 'drawerMenu'
     for keys,value in data.items():
        save = {}
        if not value.get('items'):
            save = {
                "CULTURE":'en-US',
                "MODEL":model,
                "SHORT_LABEL":keys,
                "PARENT":parentName,
                "ICON":value.get('Icon'),
                "TITLE":value.get('title'),
                "URL":value.get('url'),
            }
        else:
            save = {
                "CULTURE":'en-US',
                "MODEL":model,
                "SHORT_LABEL":keys,
                "PARENT":parentName,
                "ICON":value.get('Icon'),
                "TITLE":value.get('title'),
                "URL":value.get('url')
            }
            createMenuTempt(value.get('items'),child_dict,keys)
        url = "http://localhost:8000/api/v1/menu/save/"
        headers = {'Content-type': 'application/json', 'Accept': 'application/json'}    
        model = 'drawerMenu'
        requests.post(url,json.dumps(save),headers=headers)
      
        