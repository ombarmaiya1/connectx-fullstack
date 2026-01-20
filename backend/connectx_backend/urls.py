"""
URL configuration for connectx_backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/profile/', include('profiles.urls')),
    path('api/match/', include('matching.urls')),
    path('api/connect/', include('connections.urls')),
    path('api/chat/', include('chat.urls')),
]
