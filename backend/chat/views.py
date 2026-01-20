from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer
from connections.models import ConnectionRequest


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_or_create_room(request):
    """
    Get or create a chat room with a specific user.
    Requires an accepted connection between the users.
    """
    target_user_id = request.data.get('user_id')
    if not target_user_id:
        return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
    # Verify connection exists and is accepted
    connection = ConnectionRequest.objects.filter(
        (Q(sender=request.user) & Q(receiver_id=target_user_id)) |
        (Q(sender_id=target_user_id) & Q(receiver=request.user)),
        status='accepted'
    ).first()
    
    if not connection:
        return Response(
            {'error': 'You must be connected with this user to chat'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Check if room already exists
    # This queries for rooms that have both users
    # We use distinct() to avoid duplicates if multiple rooms exist (though they shouldn't)
    existing_rooms = ChatRoom.objects.filter(users=request.user).filter(users__id=target_user_id)
    
    if existing_rooms.exists():
        room = existing_rooms.first()
    else:
        room = ChatRoom.objects.create()
        room.users.add(request.user, target_user_id)
    
    return Response(ChatRoomSerializer(room, context={'request': request}).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_rooms(request):
    """Get all chat rooms for the current user"""
    rooms = request.user.chat_rooms.all().prefetch_related('users', 'messages')
    return Response(ChatRoomSerializer(rooms, many=True, context={'request': request}).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request, room_id):
    """Get messages for a specific room"""
    room = get_object_or_404(ChatRoom, id=room_id)
    
    # Verify user is in the room
    if not room.users.filter(id=request.user.id).exists():
        return Response(
            {'error': 'Access denied'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Mark unread messages as read
    room.messages.filter(is_read=False).exclude(sender=request.user).update(is_read=True)
    
    messages = room.messages.all().select_related('sender', 'sender__profile')
    return Response(MessageSerializer(messages, many=True).data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    """
    POST /api/messages/send
    
    Send a message to a user (requires accepted connection)
    
    Body:
    - recipientId: Target user ID
    - message: Message content
    """
    recipient_id = request.data.get('recipientId')
    message_content = request.data.get('message', '').strip()
    
    if not recipient_id:
        return Response(
            {'error': 'recipientId is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not message_content:
        return Response(
            {'error': 'message is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if recipient exists
    try:
        from django.contrib.auth import get_user_model
        User = get_user_model()
        recipient = User.objects.get(id=recipient_id)
    except User.DoesNotExist:
        return Response(
            {'error': 'Recipient not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Verify connection exists and is accepted
    connection = ConnectionRequest.objects.filter(
        (Q(sender=request.user) & Q(receiver=recipient)) |
        (Q(sender=recipient) & Q(receiver=request.user)),
        status='accepted'
    ).first()
    
    if not connection:
        return Response(
            {'error': 'You must be connected with this user to send messages'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Get or create chat room
    existing_rooms = ChatRoom.objects.filter(users=request.user).filter(users=recipient)
    
    if existing_rooms.exists():
        room = existing_rooms.first()
    else:
        room = ChatRoom.objects.create()
        room.users.add(request.user, recipient)
    
    # Create message
    message = Message.objects.create(
        room=room,
        sender=request.user,
        content=message_content
    )
    
    return Response(
        MessageSerializer(message).data,
        status=status.HTTP_201_CREATED
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_thread(request, user_id):
    """
    GET /api/messages/thread/<user_id>
    
    Get all messages between logged-in user and target user
    """
    # Check if target user exists
    try:
        from django.contrib.auth import get_user_model
        User = get_user_model()
        target_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Find chat room between users
    room = ChatRoom.objects.filter(users=request.user).filter(users=target_user).first()
    
    if not room:
        # No conversation exists yet
        return Response({
            'success': True,
            'data': [],
            'roomId': None
        })
    
    # Mark unread messages as read
    room.messages.filter(is_read=False).exclude(sender=request.user).update(is_read=True)
    
    # Get all messages
    messages = room.messages.all().select_related('sender', 'sender__profile')
    
    return Response({
        'success': True,
        'data': MessageSerializer(messages, many=True).data,
        'roomId': room.id
    })

