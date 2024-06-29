from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='homepage'),
    path('login/', views.login_view, name='login'),
    path('login/oauth/callback/', views.oauth_callback, name='oauth_callback'),
    path('logout/', views.logout_view, name='logout'),
]
