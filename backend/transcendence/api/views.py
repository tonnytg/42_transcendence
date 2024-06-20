from django.shortcuts import render
from django.conf import settings


# Create your views here.
def header_component(request):
    user_authenticated = request.user.is_authenticated
    user_name = request.user.username if user_authenticated else ''
    csrf_token = request.COOKIES.get('csrftoken', '')

    context = {
        'user_authenticated': user_authenticated,
        'user_name': user_name,
        'csrf_token': csrf_token,
        'CLIENT_ID_42': settings.CLIENT_ID_42,
        'REDIRECT_URI_42': settings.REDIRECT_URI_42,
    }

    return render(request, 'api/header_component.html', context)
