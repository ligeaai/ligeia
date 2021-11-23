from settings.base import *  # NOQA

DEBUG = True
INSTALLED_APPS += ['django_extensions', ]
ALLOWED_HOSTS += ['192.168.1.110']

DATABASE_ROUTERS = ['manager.router.DatabaseAppsRouter']
DATABASE_APPS_MAPPING = {'dbmodels': 'default', 
                         'oauth':'default'}

DATABASES = {
    'default': {
        'NAME': 'dev_db',
        'ENGINE': 'django.db.backends.postgresql',    
        'USER': 'postgres',
        'PASSWORD': 'admin',        
    },
    'mongodb': {
        'NAME': 'dictionaries',
        'ENGINE': 'djongo',        
        'ENFORCE_SCHEMA': False,
            # 'CLIENT': {
            #     'host': 'localhost',
            #     'port': 270117,
            #     # 'username': 'db-username',
            #     # 'password': 'password',
            #     # 'authSource': 'dictionaries',
            #     # 'authMechanism': 'SCRAM-SHA-1'
            # }
    },
}
