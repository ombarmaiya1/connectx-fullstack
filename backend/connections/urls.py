from django.urls import path
from .views import (
    send_connection_request,
    accept_connection_request,
    reject_connection_request,
    get_connection_requests,
    get_connection_status
)

urlpatterns = [
    path('request', send_connection_request, name='send_connection_request'),
    path('accept', accept_connection_request, name='accept_connection_request'),
    path('reject', reject_connection_request, name='reject_connection_request'),
    path('requests', get_connection_requests, name='get_connection_requests'),
    path('status/<int:user_id>/', get_connection_status, name='connection_status'),
]
