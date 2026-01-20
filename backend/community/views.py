from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db.models import Count, Q
from django.contrib.auth import get_user_model
from .models import Discussion, Event, Comment
from .serializers import DiscussionSerializer, EventSerializer, CommentSerializer
from profiles.models import Profile

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def community_summary(request):
    """
    GET /api/community/summary
    Returns stats for the community hub header
    """
    try:
        active_members = User.objects.count()
        discussions_count = Discussion.objects.count()
        events_count = Event.objects.count()
        # Mocking projects count for now, or could link to another app
        projects_count = Discussion.objects.filter(tags__contains=['project']).count()

        return Response({
            'success': True,
            'data': {
                'activeMembers': active_members,
                'discussionsCount': discussions_count,
                'eventsCount': events_count,
                'projectsStarted': projects_count
            }
        })
    except Exception as e:
        return Response(
            {'success': False, 'message': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def top_contributors(request):
    """
    GET /api/community/top-contributors
    Returns users with most discussions created
    """
    try:
        # Get top 5 users by number of discussions created
        contributors = User.objects.annotate(
            posts_count=Count('discussions')
        ).order_by('-posts_count')[:5]

        data = []
        for user in contributors:
            # Get profile safely
            profile = getattr(user, 'profile', None)
            data.append({
                'id': user.id,
                'name': profile.full_name if profile else user.email.split('@')[0],
                'college': profile.college if profile else 'Unknown',
                'posts': user.posts_count,
                'avatar': profile.avatar if profile else ''
            })

        return Response({
            'success': True,
            'data': data
        })
    except Exception as e:
        return Response(
            {'success': False, 'message': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Discussion.objects.all().order_by('-created_at')
    serializer_class = DiscussionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        
        # Search & Filter
        search_query = request.query_params.get('search', '')
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) | 
                Q(description__icontains=search_query) |
                Q(tags__contains=[search_query])
            )

        # Basic serialization
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # SMART MODE: Calculate Match Score
        # Improve this logic with real skill matching
        user_skills = []
        if hasattr(request.user, 'profile'):
             user_skills = [s.lower() for s in request.user.profile.skills]
        
        for item in data:
            discussion_tags = [t.lower() for t in item.get('tags', [])]
            if not discussion_tags:
                item['matchScore'] = 50 # Default if no tags
                continue
                
            matches = sum(1 for tag in discussion_tags if tag in user_skills)
            # Normalize: if 3 matches = 100%, 0 = 10%
            score = min(100, max(10, int((matches / len(discussion_tags)) * 100) if user_skills else 40))
            if matches > 0:
                 score = min(100, score + 20) # Boost for any match
            
            item['matchScore'] = score

        return Response({
            'success': True,
            'data': data
        })
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            'success': True,
            'data': serializer.data
        })

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({
            'success': True,
            'data': response.data
        })
