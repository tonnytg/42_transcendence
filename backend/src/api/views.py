from datetime import datetime, timedelta
import logging

from django.conf import settings
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import jwt
from jwt import InvalidTokenError
from django.contrib.auth.models import User

logger = logging.getLogger(__name__)

# Chave secreta para assinar o JWT (deve ser mantida segura em produção)
SECRET_KEY = settings.SECRET_KEY

# Tempo de expiração do token JWT (1 dia por padrão)
JWT_EXPIRATION_DELTA = getattr(settings, 'JWT_EXPIRATION_DELTA', timedelta(days=1))

def generate_jwt_token(user):
    """
    Função para gerar um token JWT para o usuário fornecido.
    """
    expiration = datetime.utcnow() + JWT_EXPIRATION_DELTA
    payload = {
        'user_id': user.id,
        'exp': expiration,
        'iat': datetime.utcnow(),
        'iss': 'django-pong'  # Identificador do emissor
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def validate_jwt(request):
    """
    Endpoint para validar o token JWT fornecido via GET.
    Retorna o payload se o token for válido, caso contrário retorna um erro.
    """
    logger.info("validate_jwt")
    token = request.GET.get('token')

    logger.info("token=%s", token)
    if not token:
        return JsonResponse({'error': 'Token não fornecido'}, status=400)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return JsonResponse(payload, status=200)
    except InvalidTokenError as e:
        return JsonResponse({'error': 'Token inválido'}, status=401)

@csrf_exempt
def login_form(request):
    """
    Endpoint para login e geração de JWT.
    """
    logger.info("login_form")
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        logger.info("username=%s", username)
        logger.info("password=%s", password)

        user = authenticate(username=username, password=password)

        if user is not None:
            logger.info("success: %s", user)

            # Autenticação bem-sucedida, gerar token JWT
            token = generate_jwt_token(user)

            return JsonResponse({
                'token': token,  # Removido .decode('utf-8')
                'user_id': user.id,
                'username': user.username,
                'status': 'success',
                'message': 'Credenciais válidas'
            }, status=200)
        else:
            logger.info("Credenciais inválidas para username=%s", username)
            return JsonResponse({'status': 'error', 'message': 'Credenciais inválidas'}, status=401)

    return JsonResponse({'error': 'Método não permitido'}, status=405)
