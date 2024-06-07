from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.conf import settings
import requests
from django.contrib.auth.models import User

# Data
users = [
    {
        "name": "Antonio Thomacelli Gomes",
        "about": "GCP Cloud and Software Engineer",
        "linkedin_url": "https://www.linkedin.com/in/thomacelli/",
        "github_url": "https://github.com/tonnytg"
    },
    {
        "name": "Carlos Rocha",
        "about": "Coordenador de Dados e Operações @ SESC SP Serviço Social do Comércio | AWS Certified",
        "linkedin_url": "https://www.linkedin.com/in/carlos-rocha-tech/",
        "github_url": "https://github.com/carlosrocha-dev"
    },
    {
        "name": "Marcelo Magalhães",
        "about": "Engenharia de Software | 42SP | C/C++ | Golang | Linux",
        "linkedin_url": "https://www.linkedin.com/in/marcelo-magalh%C3%A3es-445a29a4/",
        "github_url": "https://github.com/magalhaesm"
    },
    {
        "name": "Gilmar Romani",
        "about": "Desenvolvedor Back-End | .NET | C# | C | Redis | RabbitMQ | SQL | AWS | Linux | Git | Jira",
        "linkedin_url": "https://www.linkedin.com/in/gilmar-romani/",
        "github_url": "https://github.com/gialexan"
    },
    {
        "name": "Ygor de Goes Sena",
        "about": "Engenheiro de Software • Back-end • DevOps • UI/UX Designer",
        "linkedin_url": "https://www.linkedin.com/in/ygor-sena/",
        "github_url": "https://github.com/ygor-sena"
    }
]

texts = [
    "This is the first section",
    "This is the second section",
    "This is the third section"
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
            'grant_type': 'authorization_code'
        }
        response = requests.post(token_url, data=payload)
        if response.status_code == 200:
            access_token = response.json()['access_token']
            user_info_url = 'https://api.intra.42.fr/v2/me'
            user_info_response = requests.get(user_info_url, headers={'Authorization': 'Bearer ' + access_token})
            if user_info_response.status_code == 200:
                user_info = user_info_response.json()
                user_id = user_info['id']
                username = user_info['login']
                email = user_info['email']
                first_name = user_info['first_name']
                last_name = user_info['last_name']

                # Get or create the user
                user, created = User.objects.get_or_create(username=username, defaults={
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name
                })

                if created:
                    user.set_unusable_password()
                    user.save()

                # Authenticate the user
                login(request, user)

                return redirect('homepage')
            else:
                return HttpResponse('Erro ao obter informações do usuário')
        else:
            return HttpResponse('Erro ao obter token de acesso')
    else:
        return HttpResponse('Código de autorização não fornecido')

# Local authentication
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('homepage')
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('homepage')
    else:
        return redirect('homepage')

def logout_view(request):
    logout(request)
    return redirect('homepage')

# Pages
def index(request):
    context = {
        "datas": users,
        "CLIENT_ID_42": settings.CLIENT_ID_42,
        "REDIRECT_URI_42": settings.REDIRECT_URI_42
    }
    return render(request, "index.html", context)

def game(request):
    return render(request, "game.html")

def section(request, num):
    if 1 <= num <= 3:
        return HttpResponse(texts[num-1])
    else:
        return HttpResponse("Invalid section number")