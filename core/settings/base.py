
import os
from pathlib import Path
from django.utils.translation import gettext_lazy as _

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-9j935o7+7efsdf0)zfmbsg9ipx)u@s8r@3goejc_y^d**7^78w'

# SECURITY WARNING: don't run with debug turned on in production!
SITE_ID = 1
LOGIN_REDIRECT_URL = '/admin/'

ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_VERIFICATION = 'none'

ALLOWED_HOSTS = ['127.0.0.1',
                 'localhost',
                 '192.168.1.110',
                 'sandbox.nordal.kz',
                 '20.0.0.20',
                 '*']

CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000',
    'http://0.0.0.0:8000'
)

# CORS_ALLOW_ALL_ORIGINS = True # If this is used then `CORS_ALLOWED_ORIGINS` will not have any effect
# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:8000',
# ]                 

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.contenttypes',

    # auth apps
    'allauth',
    'allauth.account',
    'allauth.socialaccount',    
    # 'allauth.socialaccount.providers.google',
    # 'allauth.socialaccount.providers.facebook',

    #rest
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',
    
    #other apps
    'django_filters',
    'corsheaders',
    'modeltranslation',
    'cities_light',
    'smart_selects',
    'polymorphic',
    'knox',
    'drf_yasg',
    'adminsortable2',

    #defined apps
    'db_models',
    'db_dictionaries',
    'db_oauth',
    'restapi',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'core.urls'

REST_FRAMEWORK = {    
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'knox.auth.TokenAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        #    'rest_framework.authentication.SessionAuthentication',
    ],
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'
ASGI_APPLICATION = 'core.asgi.application'
AUTH_USER_MODEL  = 'db_oauth.platform_User'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#Authentication backends
AUTHENTICATION_BACKENDS = [    
    'django.contrib.auth.backends.ModelBackend',    
    'allauth.account.auth_backends.AuthenticationBackend',
]

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGES = [
    ('en', _('English')),
    ('ru', _('Russian')),
    # ('de', _('German')),
    # ('tr', _('Turkish')),
]


CITIES_LIGHT_TRANSLATION_LANGUAGES = ['en', 'ru']
CITIES_LIGHT_INCLUDE_COUNTRIES = ['KZ', 'CA']

MODELTRANSLATION_LANGUAGES = ('en', 'ru')

MODELTRANSLATION_TRANSLATIONS_FILES = (
    'translation'
)

LANGUAGE_CODE = 'en-us'

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale'),
)

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')



