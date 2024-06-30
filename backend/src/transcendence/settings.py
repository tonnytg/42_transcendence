import os
from datetime import timedelta

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('API_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',  # Adiciona o Django REST Framework
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Permitir todas as origens (CORS)
CORS_ALLOW_ALL_ORIGINS = True

# Desativar o uso de cookies seguros para CSRF (apenas para desenvolvimento)
CSRF_COOKIE_SECURE = False

# Configuration for 42 OAuth
CLIENT_ID_42 = os.environ.get('APP_AUTH_CLIENT_ID')
CLIENT_SECRET_42 = os.environ.get('APP_AUTH_CLIENT_SECRET')
REDIRECT_URI_42 = os.environ.get('APP_AUTH_REDIRECT_URI')

# settings.py
OAUTH_CLIENT_ID = 'u-s4t2ud-949c9204ce2bacc41d9143cdcb52e5152e57d57686ef9cad4cfbe996f15a106e'
OAUTH_CLIENT_SECRET = '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'

# Chave criada pelo Gilmar
SECRET_KEY_JWT = 'XZofzeCoM-JjFfHGmPMxj-8ntGm6ThE2gUcASy_yLTQ='

# Configuration for JWT using djangorestframework-jwt
JWT_AUTH = {
    'JWT_SECRET_KEY': SECRET_KEY_JWT,  # Chave secreta para assinar tokens
    'JWT_EXPIRATION_DELTA': timedelta(seconds=300),  # Exemplo de tempo de expiração do token
    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
}

# External Routes (to redirect)
# HOMEPAGE_URL = 'http://localhost'

ROOT_URLCONF = 'transcendence.urls'

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

WSGI_APPLICATION = 'transcendence.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': os.environ.get('APP_DB_HOST'),
        'PORT': os.environ.get('APP_DB_PORT'),
        'NAME': os.environ.get('APP_DB_NAME'),
        'USER': os.environ.get('APP_DB_USER'),
        'PASSWORD': os.environ.get('APP_DB_PASSWORD'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
