import couchdb
import json
import environ

# will be made dynamic according to the structure to be created.
env = environ.Env(DEBUG=(bool, False))
user = env("COUCHDB_USER")
password = env("COUCHDB_PASSWORD")
couchserver = couchdb.Server("http://%s:%s@ligeiaai-couchserver-1:5984/" % (user, password))
print(user)

def create_to_couchdb():
    modelName = ['type','TYPE_PROPERTY']
    for model in modelName:
        model = model.lower()
        jsonpath = '/django/backend/apps/'+model+'/'+model+'.json'
        db = couchserver.create(model)
        db = couchserver[model]

        file = open(jsonpath)
        json_obj = json.load(file)
        db.save(json_obj)

create_to_couchdb()