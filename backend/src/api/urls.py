from django.urls import path
from . import views

urlpatterns = [
    path('home-view/', views.home_view, name='home_view'),
    path('login-component/', views.login_component, name='login_component'),
    path('header-component/', views.header_component, name='header_component'),
]
