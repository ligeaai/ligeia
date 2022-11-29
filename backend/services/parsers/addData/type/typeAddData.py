import json
import time

import numpy as np
import pandas as pd
import requests
from numpy import r_


def import_data(data):
    urlDict = {
        "TYPE_LINK": "type-link",
        "TYPE": "type",
        "TYPE_PROPERTY": "type-property",
        "CODE_LIST": "code-list",
        "RESOURCE_LIST": "resource-list",
        "ITEM_PROPERTY": "item-property",
        "ITEM": "item",
        "LAYER": "layer",
    }
    base_url = "http://34.125.220.112:8000/api/v1/" + urlDict.get(data) + "/save/"
    _create_method(base_url, data)


def _create_method(url, data):
    dataset = pd.read_csv(
        "/django/backend/services/parsers/addData/type/" + data + ".csv"
    )
    headers = {"Content-type": "application/json", "Accept": "application/json"}
    dataset = dataset.fillna(value="None")
    for index in range(0, dataset.shape[0]):
        data = dataset.iloc[index, :]
        data = data.to_dict()
        try:
            data["LAST_UPDT_DATE"] = data.get("LAST_UPDT_DATE").split(" ")[0]
            if data.get("HIDDEN"):
                data["HIDDEN"] = str(data.get("HIDDEN"))
        except Exception as e:
            print("except", e)
        for keys, value in data.items():

            if value == "None":
                data[keys] = None
            if type(value) == type(bool(True)):
                data[keys] = str(value)

            if type(value) == type(float(5)):
                data[keys] = int(value)

        requests.post(url, json.dumps(data), headers=headers)
