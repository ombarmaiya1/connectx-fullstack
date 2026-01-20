import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import ChatRoom, Message
from connections.models import ConnectionRequest

User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{self.room_id}'
        self.user = self.scope['user']
        
        # Check if user is authenticated
        if not self.user.is_authenticated:
            await self.close()
            return
        
        # Verify user has access to this room
        has_access = await self.check_room_access()
        if not has_access:
            await self.close()
            return
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
    
    async def disconnect(self, close_code):
        # Leave room group
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message_content = data.get('message', '')
        
        if not message_content:
            return
        
        # Save message to database
        message = await self.save_message(message_content)
        
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {
                    'id': message.id,
                    'sender_id': message.sender.id,
                    'sender_name': message.sender.profile.full_name,
                    'content': message.content,
                    'timestamp': message.timestamp.isoformat(),
                }
            }
        )
    
    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'message',
            'data': event['message']
        }))
    
    @database_sync_to_async
    def check_room_access(self):
        """Check if user has access to this chat room (must be connected)"""
        try:
            room = ChatRoom.objects.get(id=self.room_id)
            
            # Check if user is part of the room
            if not room.users.filter(id=self.user.id).exists():
                return False
            
            # Get the other user in the room
            other_user = room.users.exclude(id=self.user.id).first()
            
            if not other_user:
                return False
            
            # Check if they have an accepted connection
            connection_exists = ConnectionRequest.objects.filter(
                sender__in=[self.user, other_user],
                receiver__in=[self.user, other_user],
                status='accepted'
            ).exists()
            
            return connection_exists
            
        except ChatRoom.DoesNotExist:
            return False
    
    @database_sync_to_async
    def save_message(self, content):
        """Save message to database"""
        room = ChatRoom.objects.get(id=self.room_id)
        message = Message.objects.create(
            room=room,
            sender=self.user,
            content=content
        )
        
        # Update room's updated_at timestamp
        room.save()
        
        return message
