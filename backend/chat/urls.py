from django.urls import path
from .views import get_or_create_room, get_rooms, get_messages

urlpatterns = [
    path('room/create', get_or_create_room, name='create_room'),
    path('rooms', get_rooms, name='get_rooms'),
    path('room/<int:room_id>/messages', get_messages, name='get_messages'),
]
