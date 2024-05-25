from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

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
        "datas": users
    }
    return render(request, "index.html", context)
