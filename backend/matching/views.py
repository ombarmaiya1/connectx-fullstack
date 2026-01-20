from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from profiles.models import Profile
from .services import MatchingService


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def find_matches(request):
    try:
        user_profile = request.user.profile
        
        # Check if profile is complete enough for matching
        if not user_profile.skills or not user_profile.college:
            return Response(
                {'error': 'Please complete your profile (skills and college required) before finding matches'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get limit from request, default to 50
        limit = request.data.get('limit', 50)
        
        # Find matches
        matches = MatchingService.find_matches(user_profile, limit=limit)
        
        return Response({
            'count': len(matches),
            'matches': matches
        })
        
    except Profile.DoesNotExist:
        return Response(
            {'error': 'Profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )
