import random
import string
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils import timezone
from .models import MFA
import requests
import jwt
from datetime import datetime, timedelta


# Data
users = [
    {
        'name': 'Antonio Thomacelli Gomes',
        'about': 'GCP Cloud and Software Engineer',
        'linkedin_url': 'https://www.linkedin.com/in/thomacelli/',
        'github_url': 'https://github.com/tonnytg',
    },
    {
        'name': 'Carlos Rocha',
        'about': 'Coordenador de Dados e Operações @ SESC SP Serviço Social do Comércio | AWS Certified',
        'linkedin_url': 'https://www.linkedin.com/in/carlos-rocha-tech/',
        'github_url': 'https://github.com/carlosrocha-dev',
    },
    {
        'name': 'Marcelo Magalhães',
        'about': 'Engenharia de Software | 42SP | C/C++ | Golang | Linux',
        'linkedin_url': 'https://www.linkedin.com/in/marcelo-magalhaes-/',
        'github_url': 'https://github.com/magalhaesm',
    },
    {
        'name': 'Gilmar Romani',
        'about': 'Desenvolvedor Back-End | .NET | C# | C | Redis | RabbitMQ | SQL | AWS | Linux | Git | Jira',
        'linkedin_url': 'https://www.linkedin.com/in/gilmar-romani/',
        'github_url': 'https://github.com/gialexan',
    },
    {
        'name': 'Ygor de Goes Sena',
        'about': 'Engenheiro de Software • Back-end • DevOps • UI/UX Designer',
        'linkedin_url': 'https://www.linkedin.com/in/ygor-sena/',
        'github_url': 'https://github.com/ygor-sena',
    },
]


# Remote authentication
def oauth_callback(request):
    code = request.GET.get('code')
    if code:
        token_url = 'https://api.intra.42.fr/oauth/token'
        payload = {
            'client_id': settings.CLIENT_ID_42,
            'client_secret': settings.CLIENT_SECRET_42,
            'code': code,
            'redirect_uri': settings.REDIRECT_URI_42,
            'grant_type': 'authorization_code',
        }
        response = requests.post(token_url, data=payload)
        if response.status_code == 200:
            access_token = response.json()['access_token']
            user_info_url = 'https://api.intra.42.fr/v2/me'
            user_info_response = requests.get(
                user_info_url, headers={'Authorization': 'Bearer ' + access_token}
            )
            if user_info_response.status_code == 200:
                user_info = user_info_response.json()
                # user_id = user_info['id']
                username = user_info['login']
                email = user_info['email']
                first_name = user_info['first_name']
                last_name = user_info['last_name']

                # Get or create the user
                user, created = User.objects.get_or_create(
                    username=username,
                    defaults={
                        'email': email,
                        'first_name': first_name,
                        'last_name': last_name,
                    },
                )

                if created:
                    user.set_unusable_password()
                    user.save()

                # Authenticate the user
                login(request, user)

                return redirect('homepage')
            else:
                return HttpResponse(b'Erro ao obter informacoes do usuario')
        else:
            return HttpResponse(b'Erro ao obter token de acesso')
    else:
        return HttpResponse(b'Codigo de autorizacao nao fornecido')


# Local authentication
def login_view(request):
    # Mock user
    mock_username = 'gialexan'
    mock_email = 'alexromani.sc@gmail.com'
    mock_password = 'admin'

    # Create mock user
    user, created = User.objects.get_or_create(username=mock_username, email=mock_email)
    if created:
        user.set_password(mock_password)
        user.save()

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Generate MFA code
            characters = string.ascii_uppercase + string.digits
            mfa_code = ''.join(random.choices(characters, k=5))

            # Save MFA code in the database
            created = MFA.create_mfa(user=user, mfa_code=mfa_code)
            if created:
                # Gabiarra para mostrar o campo de MFA na tela
                request.session['show_mfa'] = True

                # Save user in the session
                request.session['id'] = user.id
                request.session['name'] = user.username

                # Send MFA code by email
                send_mail(
                    'Código de MFA',
                    f'Seu código de MFA é: {mfa_code}',
                    settings.EMAIL_HOST_USER,
                    ['alexromani.sc@gmail.com'],
                    fail_silently=False,
                )
                return redirect('homepage')
            else:
                messages.error(request, 'Erro ao gerar código MFA')
                return redirect('login')
        else:
            messages.error(request, 'Nome de usuário ou senha inválidos')
            return redirect('login')
    else:
        return redirect('homepage')
        # return redirect(settings.HOMEPAGE_URL)


def logout_view(request):
    logout(request)
    return redirect('homepage')


# Pages
def index(_):
    return redirect(settings.HOMEPAGE_URL)


def mfa_view(request):
    if 'show_mfa' in request.session:
        del request.session['show_mfa']
    if request.method == 'POST':
        mfa_code = request.POST.get('mfa_code')

        # Get the client ID
        client_id = request.session.get('id')
        # Get the latest MFA code
        mfa = MFA.get_latest_mfa(client_id)
        if mfa.consumed:
            messages.error(request, 'Código MFA já utilizado')
            return redirect('homepage')

        if mfa.expires_at < timezone.now():
            messages.error(request, 'Código MFA expirado')
            return redirect('homepage')

        if mfa.code != mfa_code:
            messages.error(request, 'Código MFA incorreto')
            return redirect('homepage')

        # Mark MFA as consumed
        mfa.mark_as_consumed()

        # Generate JWT token
        payload = {
            'id': request.user.id,
            'username': request.user.username,
            'exp': datetime.now() + timedelta(hours=1),
        }
        token = jwt.encode(payload, settings.SECRET_KEY_JWT, algorithm='HS256')

        # Save JWT token in the session
        request.session['jwt_token'] = token

        user = User.objects.get(id=client_id)
        login(request, user)

        return redirect('homepage')
    else:
        return render(request, 'homepage')
