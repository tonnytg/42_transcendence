from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.conf import settings
import requests


# Dummy user data
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

def oauth2_callback(request):
    # Verifica se o código de autorização foi fornecido na query string da URL
    code = request.GET.get('code')
    if code:
        # Constrói a URL para trocar o código de autorização por um token de acesso
        token_url = 'https://api.intra.42.fr/oauth/token'
        payload = {
            'client_id': settings.CLIENT_ID_42,
            'client_secret': settings.CLIENT_SECRET_42,
            'code': code,
            'redirect_uri': 'http://localhost:8000/oauth2/v2/redirect',
            'grant_type': 'authorization_code'
        }
        # Envia uma solicitação POST para obter o token de acesso
        response = requests.post(token_url, data=payload)
        if response.status_code == 200:
            # Se a solicitação for bem-sucedida, você pode processar o token de acesso aqui
            access_token = response.json()['access_token']
            # Redirecione para a função get_user_projects

            # curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://api.intra.42.fr/oauth/token/info
            token_info = requests.get('https://api.intra.42.fr/oauth/token/info', headers={'Authorization': 'Bearer ' + access_token})
            if token_info.status_code == 200:
                user_id = token_info.json()['resource_owner_id']
                print(user_id)
            else:
                return HttpResponse('Erro ao obter informações do token de acesso')
            
            user_id = token_info.json()['resource_owner_id']

            return get_user_projects(request, access_token, user_id)
        else:
            # Se a solicitação falhar, você pode lidar com isso adequadamente, como exibindo uma mensagem de erro
            return HttpResponse('Erro ao obter token de acesso')
    else:
        # Se não houver código de autorização, redirecione para a página de erro
        return HttpResponse('Código de autorização não fornecido')
    

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

def index(request):
    context = {
        "datas": users,
        "CLIENT_ID_42": settings.CLIENT_ID_42
    }
    return render(request, "index.html", context)

def get_user_projects(request, access_token, user_id):
    # Construa a URL do endpoint de projetos do usuário com o user_id
    projects_url = f'https://api.intra.42.fr/v2/users/{user_id}/projects_users'
    headers = {
        'Authorization': 'Bearer ' + access_token
    }
    response = requests.get(projects_url, headers=headers)
    if response.status_code == 200:
        # Se a solicitação for bem-sucedida, você pode processar os projetos do usuário aqui
        projects = response.json()
        # Renderize a página com os projetos do usuário
        return render(request, 'user_projects.html', {'projects': projects})
    else:
        # Se a solicitação falhar, você pode lidar com isso adequadamente, como exibindo uma mensagem de erro
        return HttpResponse('Erro ao obter projetos do usuário')