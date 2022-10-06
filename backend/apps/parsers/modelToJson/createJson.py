import json
import modeltodict
from pathInfo import pathInfo

modelName = 'type'
Path='/django/backend/apps/'
modelpath = pathInfo(modelName,Path)
maindict = modeltodict.parse_model('umut',modelpath)

with open('result.json', 'w') as fp:
    json.dump(maindict, fp,indent=2)