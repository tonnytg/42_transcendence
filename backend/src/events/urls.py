from django.urls import path
from . import views
from django.urls import path
from .consumers import GameConsumer

urlpatterns = [
    path('game/', GameConsumer),
]
