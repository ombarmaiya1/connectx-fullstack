from rest_framework import serializers
from .models import ConnectionRequest
from profiles.serializers import ProfileSerializer


class ConnectionRequestSerializer(serializers.ModelSerializer):
    sender_profile = ProfileSerializer(source='sender.profile', read_only=True)
    receiver_profile = ProfileSerializer(source='receiver.profile', read_only=True)
    sender_id = serializers.IntegerField(source='sender.id', read_only=True)
    receiver_id = serializers.IntegerField(source='receiver.id', read_only=True)
    
    class Meta:
        model = ConnectionRequest
        fields = [
            'id',
            'sender_id',
            'receiver_id',
            'sender_profile',
            'receiver_profile',
            'status',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'sender_id', 'created_at', 'updated_at']


class ConnectionRequestCreateSerializer(serializers.Serializer):
    receiver_id = serializers.IntegerField()
    
    def validate_receiver_id(self, value):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("User does not exist")
        
        return value
