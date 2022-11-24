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

