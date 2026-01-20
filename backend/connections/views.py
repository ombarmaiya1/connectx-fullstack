from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import ConnectionRequest
from .serializers import ConnectionRequestSerializer, ConnectionRequestCreateSerializer

User = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_connection_request(request):
    serializer = ConnectionRequestCreateSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    receiver_id = serializer.validated_data['receiver_id']
    
    # Check if trying to connect with self
    if receiver_id == request.user.id:
        return Response(
            {'error': 'Cannot send connection request to yourself'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        receiver = User.objects.get(id=receiver_id)
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Check if request already exists
    existing_request = ConnectionRequest.objects.filter(
        Q(sender=request.user, receiver=receiver) |
        Q(sender=receiver, receiver=request.user)
    ).first()
    
    if existing_request:
        if existing_request.status == 'pending':
            return Response(
                {'error': 'Connection request already pending'},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif existing_request.status == 'accepted':
            return Response(
                {'error': 'Already connected'},
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            # If previously rejected, allow new request
            existing_request.sender = request.user
            existing_request.receiver = receiver
            existing_request.status = 'pending'
            existing_request.save()
            connection_request = existing_request
    else:
        connection_request = ConnectionRequest.objects.create(
            sender=request.user,
            receiver=receiver
        )
    
    return Response(
        ConnectionRequestSerializer(connection_request).data,
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_connection_request(request):
    request_id = request.data.get('request_id')
    
    if not request_id:
        return Response(
            {'error': 'request_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        connection_request = ConnectionRequest.objects.get(
            id=request_id,
            receiver=request.user,
            status='pending'
        )
    except ConnectionRequest.DoesNotExist:
        return Response(
            {'error': 'Connection request not found or already processed'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    connection_request.status = 'accepted'
    connection_request.save()
    
    return Response(
        ConnectionRequestSerializer(connection_request).data
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_connection_request(request):
    request_id = request.data.get('request_id')
    
    if not request_id:
        return Response(
            {'error': 'request_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        connection_request = ConnectionRequest.objects.get(
            id=request_id,
            receiver=request.user,
            status='pending'
        )
    except ConnectionRequest.DoesNotExist:
        return Response(
            {'error': 'Connection request not found or already processed'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    connection_request.status = 'rejected'
    connection_request.save()
    
    return Response(
        ConnectionRequestSerializer(connection_request).data
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_connection_requests(request):
    # Get pending requests received by the user
    received_requests = ConnectionRequest.objects.filter(
        receiver=request.user,
        status='pending'
    ).select_related('sender__profile')
    
    # Get all sent requests
    sent_requests = ConnectionRequest.objects.filter(
        sender=request.user
    ).select_related('receiver__profile')
    
    # Get accepted connections
    accepted_connections = ConnectionRequest.objects.filter(
        Q(sender=request.user) | Q(receiver=request.user),
        status='accepted'
    ).select_related('sender__profile', 'receiver__profile')
    
    return Response({
        'received_pending': ConnectionRequestSerializer(received_requests, many=True).data,
        'sent': ConnectionRequestSerializer(sent_requests, many=True).data,
        'connections': ConnectionRequestSerializer(accepted_connections, many=True).data,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_connection_status(request, user_id):
    """
    GET /api/connections/status/<user_id>
    Returns connection status between logged-in user and target user
    """
    # Check if trying to get status with self
    if user_id == request.user.id:
        return Response({
            'status': 'not_connected',
            'requestId': None,
            'message': 'Cannot connect with yourself'
        })
    
    # Check if target user exists
    try:
        target_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Check for existing connection request
    connection = ConnectionRequest.objects.filter(
        Q(sender=request.user, receiver=target_user) |
        Q(sender=target_user, receiver=request.user)
    ).first()
    
    if not connection:
        return Response({
            'status': 'not_connected',
            'requestId': None
        })
    
    # Map backend status to frontend status
    status_map = {
        'pending': 'pending',
        'accepted': 'connected',
        'rejected': 'not_connected',
    }
    
    return Response({
        'status': status_map.get(connection.status, 'not_connected'),
        'requestId': connection.id,
        'isSender': connection.sender.id == request.user.id
    })

