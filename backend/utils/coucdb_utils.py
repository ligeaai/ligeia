import environ
import couchdb
import json
import datetime

env = environ.Env(DEBUG=(bool, False))
user = env("COUCHDB_USER")
password = env("COUCHDB_PASSWORD")
# host = env("COUCHDB_HOST")
host = "35.226.230.19"
couchserver = couchdb.Server("http://"+str(user)+':'+str(password)+"@"+host+":5984/")


class couchdbUtils():

    def createDoc(self,**kwargs):
        try:
            self._CheckDb(model = kwargs['model'])
            db = couchserver[kwargs['model']]
            db.save(kwargs['doc'])
          
        except Exception as e:
            print('HATA',e)

    def _CheckDb(self,**kwargs):
        try:
            db = couchserver.create(kwargs['model'])
        except:
            pass

           
