from django.urls import path
from .views import get_my_profile, update_profile, get_profile_by_id
from .network_views import discover_users, search_users

urlpatterns = [
    # Network Discovery
    path('network/', discover_users, name='discover_users'),
    path('network/search/', search_users, name='search_users'),
    
    # GET /api/profile/me - Get logged-in user's profile
    path('me/', get_my_profile, name='my_profile'),
    path('me', get_my_profile, name='my_profile_no_slash'),
    
    # PATCH /api/profile/ - Update profile (matches userAPI.updateProfile)
    path('', update_profile, name='update_profile'),
    
    # GET /api/profile/<user_id> - Get another user's profile
    path('<int:user_id>/', get_profile_by_id, name='profile_by_id'),
]
