from django.urls import path
# Import views from the root directory
from . import views

# Map the views with a path.
urlpatterns = [
    path('', views.index, name='homepage')
]