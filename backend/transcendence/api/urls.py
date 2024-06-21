from django.urls import path
from . import views

urlpatterns = [
    path('api/header-component/', views.header_component, name='header_component'),
    path('api/card-login-component/', views.card_login_component, name='card_login_component'),
]
