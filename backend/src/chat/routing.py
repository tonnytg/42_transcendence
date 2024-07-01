from django.urls import path
from . import consumers

websocket_urlpatterns = [
    # path(r'ws/open_chat/<uuid>/', consumers.JoinAndLeave.as_asgi())
    path(r'ws/chat/', consumers.JoinAndLeave.as_asgi())
]
