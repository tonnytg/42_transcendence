from datetime import datetime, timedelta
import logging
import json

from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import jwt
from jwt import InvalidTokenError

logger = logging.getLogger(__name__)

SECRET_KEY = settings.SECRET_KEY
JWT_EXPIRATION_DELTA = getattr(settings, 'JWT_EXPIRATION_DELTA', timedelta(days=1))

def generate_jwt_token(user):
    expiration = datetime.utcnow() + JWT_EXPIRATION_DELTA
    payload = {
        'user_id': user.id,
        'exp': expiration,
        'iat': datetime.utcnow(),
        'iss': 'django-pong'
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

@require_http_methods(["GET"])
def validate_jwt(request):
    logger.info("validate_jwt")
    auth_header = request.headers.get('Authorization')
    logger.info("auth_header=%s", auth_header)
    if not auth_header or not auth_header.startswith('Bearer '):
        return JsonResponse({'error': 'Token não fornecido'}, status=400)

    token = auth_header.split(' ')[1]
    logger.info("token=%s", token)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return JsonResponse(payload, status=200)
    except InvalidTokenError as e:
        return JsonResponse({'error': 'Token inválido'}, status=401)

@csrf_exempt
def login_form(request):
    logger.info("login_form")
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        logger.info("username=%s", username)
        logger.info("password=%s", password)
        user = authenticate(username=username, password=password)
        if user is not None:
            logger.info("success: %s", user)
            token = generate_jwt_token(user)
            return JsonResponse({
                'token': token,
                'user_id': user.id,
                'username': user.username,
                'status': 'success',
                'message': 'Credenciais válidas'
            }, status=200)
        else:
            logger.info("Credenciais inválidas para username=%s", username)
            return JsonResponse({'status': 'error', 'message': 'Credenciais inválidas'}, status=401)
    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if User.objects.filter(username=username).exists():
                return JsonResponse({'status': 'error', 'message': 'Username already exists'}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            return JsonResponse({'status': 'success', 'message': 'User registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'error': 'Método não permitido'}, status=405)
