from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='homepage'),
    path('login/', views.login_view, name='login'),
    path('login/oauth/callback', views.oauth_callback, name='oauth_callback'),
    path('logout/', views.logout_view, name='logout'),
    path('mfa/', views.mfa_view, name='mfa'),

    re_path(r'^(?!media).*$' , views.index, name='index'),  # Redireciona todas as outras rotas para index
]