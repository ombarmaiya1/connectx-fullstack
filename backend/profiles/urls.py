from django.urls import path
from .views import get_my_profile, update_profile, get_profile_by_id

urlpatterns = [
    # GET /api/profile/me - Get logged-in user's profile
    path('me/', get_my_profile, name='my_profile'),
    path('me', get_my_profile, name='my_profile_no_slash'),
    
    # PATCH /api/profile/ - Update profile (matches userAPI.updateProfile)
    path('', update_profile, name='update_profile'),
    
    # GET /api/profile/<user_id> - Get another user's profile
    path('<int:user_id>/', get_profile_by_id, name='profile_by_id'),
]
