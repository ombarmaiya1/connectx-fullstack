from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer, ProfileUpdateSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_profile(request):
    """
    GET /api/profile/me
    Returns logged-in user's full profile with counts
    """
    try:
        # Get or create profile for user
        profile, created = Profile.objects.get_or_create(user=request.user)
        
        serializer = ProfileSerializer(profile)
        return Response({
            'success': True,
            'data': serializer.data
        })
    except Exception as e:
        return Response(
            {
                'success': False,
                'message': f'Error fetching profile: {str(e)}'
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    PATCH /api/profile/ or /api/users/profile/
    Updates user profile with frontend formData
    Returns updated profile with all fields
    """
    try:
        # Get or create profile
        profile, created = Profile.objects.get_or_create(user=request.user)
        
        # Update with frontend data
        serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            
            # Return full profile data
            full_serializer = ProfileSerializer(profile)
            return Response({
                'success': True,
                'data': full_serializer.data
            })
        
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        return Response(
            {
                'success': False,
                'message': f'Error updating profile: {str(e)}'
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_by_id(request, user_id):
    """
    GET /api/profile/<user_id>
    Returns another user's profile (public view)
    """
    try:
        profile = Profile.objects.get(user__id=user_id)
        serializer = ProfileSerializer(profile)
        return Response({
            'success': True,
            'data': serializer.data
        })
    except Profile.DoesNotExist:
        return Response(
            {
                'success': False,
                'message': 'Profile not found'
            },
            status=status.HTTP_404_NOT_FOUND
        )
