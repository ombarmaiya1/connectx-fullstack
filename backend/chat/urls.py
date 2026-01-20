from django.urls import path
from .views import get_or_create_room, get_rooms, get_messages, send_message, get_thread

urlpatterns = [
    path('room/create', get_or_create_room, name='create_room'),
    path('rooms', get_rooms, name='get_rooms'),
    path('room/<int:room_id>/messages', get_messages, name='get_messages'),
    path('send/', send_message, name='send_message'),
    path('thread/<int:user_id>/', get_thread, name='get_thread'),
]
