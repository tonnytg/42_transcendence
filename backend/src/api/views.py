from datetime import datetime, timedelta
import json
import logging

from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import jwt
import requests
from jwt import InvalidTokenError

logger = logging.getLogger(__name__)

SECRET_KEY = settings.SECRET_KEY
JWT_EXPIRATION_DELTA = getattr(settings, 'JWT_EXPIRATION_DELTA', timedelta(days=1))

def generate_jwt_token(user):
    expiration = datetime.utcnow() + JWT_EXPIRATION_DELTA
    payload = {
        'user_id': user.id,
        'username': user.username,
        'email': user.email,
        'exp': expiration,
        'iat': datetime.utcnow(),
        'iss': 'eramos6-game'
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

@require_http_methods(["GET"])
def validate_jwt(request):
    logger.info("validate_jwt")
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return JsonResponse({'error': 'Token não fornecido'}, status=400)

    token = auth_header.split(' ')[1]

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return JsonResponse(payload, status=200)
    except InvalidTokenError:
        return JsonResponse({'error': 'Token inválido'}, status=401)

@csrf_exempt
def login_form(request):
    logger.info("login_form")
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            token = generate_jwt_token(user)
            return JsonResponse({
                'token': token,
                'user_id': user.id,
                'username': user.username,
                'status': 'success',
                'message': 'Credenciais válidas'
            }, status=200)
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

@csrf_exempt
@require_http_methods(["POST"])
def validate_oauth_login(request):
    try:
        data = json.loads(request.body)
        code = data.get('code')
        if not code:
            return JsonResponse({'error': 'Code not provided'}, status=400)

        token_response = requests.post('https://api.intra.42.fr/oauth/token', data={
            'grant_type': 'authorization_code',
            'client_id': settings.OAUTH_CLIENT_ID,
            'client_secret': settings.OAUTH_CLIENT_SECRET,
            'code': code,
            'redirect_uri': settings.REDIRECT_URI_42,
        })
        
        if token_response.status_code != 200:
            return JsonResponse({'error': 'Failed to get access token from OAuth provider'}, status=400)

        token_data = token_response.json()
        access_token = token_data.get('access_token')

        if not access_token:
            return JsonResponse({'error': 'No access token found in the response'}, status=400)

        user_response = requests.get('https://api.intra.42.fr/v2/me', headers={
            'Authorization': f'Bearer {access_token}'
        })

        if user_response.status_code != 200:
            return JsonResponse({'error': 'Failed to fetch user info from OAuth provider'}, status=400)

        user_data = user_response.json()
        username = user_data['login']
        email = user_data['email']

        user, created = User.objects.get_or_create(username=username, defaults={'email': email})

        if created:
            user.set_unusable_password()
            user.save()

        token = generate_jwt_token(user)
        return JsonResponse({'token': token}, status=200)
    except Exception as e:
        logger.error(f'Error in validate_oauth_login: {e}')
        return JsonResponse({'error': str(e)}, status=500)
