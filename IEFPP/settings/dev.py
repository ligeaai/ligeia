from settings.base import *  # NOQA

DEBUG = True
INSTALLED_APPS += ['django_extensions', ]
ALLOWED_HOSTS += []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',    
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'NAME': 'dev_db',
    },
}
