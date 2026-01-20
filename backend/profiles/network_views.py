from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage
from .models import Profile
from .network_serializers import NetworkUserSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def discover_users(request):
    """
    GET /api/network
    
    Discover users for the Network Page with filtering and pagination
    
    Query params:
    - search: Search by name or skills
    - location: Filter by location
    - skills: Comma-separated skills to filter by
    - role: Filter by role/headline
    - page: Page number (default: 1)
    - limit: Results per page (default: 20)
    - match_score: Include match score calculation (default: false)
    """
    try:
        # Start with all profiles except current user
        queryset = Profile.objects.exclude(user=request.user).select_related('user')
        
        # Apply filters
        search_query = request.GET.get('search', '').strip()
        if search_query:
            # Search by name OR skills (case-insensitive)
            queryset = queryset.filter(
                Q(first_name__icontains=search_query) |
                Q(last_name__icontains=search_query) |
                Q(headline__icontains=search_query) |
                Q(skills__icontains=[search_query])  # PostgreSQL array contains
            )
        
        # Filter by location
        location = request.GET.get('location', '').strip()
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        # Filter by skills (comma-separated)
        skills_param = request.GET.get('skills', '').strip()
        if skills_param:
            skills_list = [s.strip() for s in skills_param.split(',') if s.strip()]
            for skill in skills_list:
                queryset = queryset.filter(skills__icontains=[skill])
        
        # Filter by role/headline
        role = request.GET.get('role', '').strip()
        if role:
            queryset = queryset.filter(headline__icontains=role)
        
        # Order by most recently updated
        queryset = queryset.order_by('-updated_at')
        
        # Pagination
        page = int(request.GET.get('page', 1))
        limit = int(request.GET.get('limit', 20))
        
        # Limit max results per page to prevent abuse
        limit = min(limit, 100)
        
        paginator = Paginator(queryset, limit)
        
        try:
            page_obj = paginator.page(page)
        except EmptyPage:
            # Return empty results for out-of-range pages
            return Response({
                'success': True,
                'data': [],
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': paginator.count,
                    'pages': paginator.num_pages,
                    'hasNext': False,
                    'hasPrev': False,
                }
            })
        
        # Check if match score should be included
        include_match_score = request.GET.get('match_score', 'false').lower() == 'true'
        
        # Serialize users
        serializer = NetworkUserSerializer(
            page_obj.object_list,
            many=True,
            context={
                'request': request,
                'include_match_score': include_match_score
            }
        )
        
        return Response({
            'success': True,
            'data': serializer.data,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': paginator.count,
                'pages': paginator.num_pages,
                'hasNext': page_obj.has_next(),
                'hasPrev': page_obj.has_previous(),
            }
        })
    
    except ValueError as e:
        return Response(
            {
                'success': False,
                'message': f'Invalid pagination parameters: {str(e)}'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {
                'success': False,
                'message': f'Error fetching users: {str(e)}'
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_users(request):
    """
    GET /api/network/search
    
    Search users by name or skills
    
    Query params:
    - query: Search term (required)
    - page: Page number (default: 1)
    - limit: Results per page (default: 20)
    """
    try:
        query = request.GET.get('query', '').strip()
        
        if not query:
            return Response(
                {
                    'success': False,
                    'message': 'Query parameter is required'
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Search by name OR skills (case-insensitive)
        queryset = Profile.objects.exclude(user=request.user).filter(
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(headline__icontains=query) |
            Q(skills__icontains=[query])
        ).select_related('user').order_by('-updated_at')
        
        # Pagination
        page = int(request.GET.get('page', 1))
        limit = int(request.GET.get('limit', 20))
        limit = min(limit, 100)
        
        paginator = Paginator(queryset, limit)
        
        try:
            page_obj = paginator.page(page)
        except EmptyPage:
            return Response({
                'success': True,
                'data': [],
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': 0,
                    'pages': 0,
                }
            })
        
        # Serialize users
        serializer = NetworkUserSerializer(
            page_obj.object_list,
            many=True,
            context={'request': request}
        )
        
        return Response({
            'success': True,
            'data': serializer.data,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': paginator.count,
                'pages': paginator.num_pages,
            }
        })
    
    except Exception as e:
        return Response(
            {
                'success': False,
                'message': f'Error searching users: {str(e)}'
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
