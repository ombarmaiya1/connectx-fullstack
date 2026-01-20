from django.urls import path
from .views import get_my_profile, update_profile, get_profile_by_id

urlpatterns = [
    path('me', get_my_profile, name='my_profile'),
    path('update', update_profile, name='update_profile'),
    path('<int:user_id>', get_profile_by_id, name='profile_by_id'),
]
