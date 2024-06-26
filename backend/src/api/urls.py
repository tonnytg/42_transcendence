from django.urls import path
from . import views

urlpatterns = [
    path('api/header-component/', views.header_component, name='header_component'),
]
