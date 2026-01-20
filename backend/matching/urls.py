from django.urls import path
from .views import find_matches

urlpatterns = [
    path('', find_matches, name='find_matches'),
]
