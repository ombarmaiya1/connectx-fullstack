from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    community_summary, 
    top_contributors, 
    DiscussionViewSet, 
    EventViewSet
)

router = DefaultRouter()
router.register(r'discussions', DiscussionViewSet, basename='discussion')
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
    path('summary', community_summary, name='community_summary'),
    path('top-contributors', top_contributors, name='top_contributors'),
    path('', include(router.urls)),
]
