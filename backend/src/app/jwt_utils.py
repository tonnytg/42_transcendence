from functools import wraps
from datetime import datetime, timedelta
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from django.conf import settings
from django.contrib import messages
from django.shortcuts import redirect

def jwt_required(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        jwt_token = request.session.get('jwt_token')

        if not jwt_token:
            return redirect('login')

        try:
            decoded_token = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms='HS256')

            token_exp = datetime.fromtimestamp(decoded_token['exp'])
            if token_exp < datetime.now() + timedelta(minutes=10):
                new_token = refresh_jwt_token(decoded_token)
                request.session['jwt_token'] = new_token

        except ExpiredSignatureError:
            del request.session['jwt_token']
            messages.error(request, 'Sessão expirada. Faça login novamente.')
            return redirect('login')

        except InvalidTokenError:
            del request.session['jwt_token']
            messages.error(request, 'Sessão inválida. Faça login novamente.')
            return redirect('login')

        request.jwt_payload = decoded_token

        return view_func(request, *args, **kwargs)

    return wrapped_view

def refresh_jwt_token(decoded_token):
    decoded_token['exp'] = datetime.now + timedelta(hours=1)
    new_token = jwt.encode(decoded_token, settings.SECRET_KEY, algorithm='HS256')
    return new_token