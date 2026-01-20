from rest_framework import serializers
from .models import Profile
from connections.models import ConnectionRequest


class ProfileSerializer(serializers.ModelSerializer):
    """
    Full Profile Serializer matching frontend Profile.jsx expectations
    Returns profile data with counts (connections, followers, following, skills)
    """
    # User fields
    id = serializers.IntegerField(source='user.id', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    name = serializers.SerializerMethodField()
    
    # Computed counts
    connections = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    
    # Date fields
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            # Core user fields
            'id',
            'email',
            'name',
            
            # Profile fields
            'headline',
            'bio',
            'avatar',
            'location',
            'college',
            'skills',
            
            # Counts (computed)
            'connections',
            'followers',
            'following',
            
            # Timestamps
            'createdAt',
        ]
    
    def get_name(self, obj):
        """Returns full name or falls back to first name from email"""
        return obj.name
    
    def get_connections(self, obj):
        """Returns array of accepted connection user IDs"""
        user = obj.user
        # Get accepted connections where user is sender or receiver
        sent_accepted = ConnectionRequest.objects.filter(
            sender=user, status='accepted'
        ).values_list('receiver_id', flat=True)
        
        received_accepted = ConnectionRequest.objects.filter(
            receiver=user, status='accepted'
        ).values_list('sender_id', flat=True)
        
        # Combine and return as list
        return list(set(list(sent_accepted) + list(received_accepted)))
    
    def get_followers(self, obj):
        """Returns array of follower user IDs (people who sent them connection requests)"""
        user = obj.user
        # For now, treating accepted connections as followers/following
        # Could be extended with a separate Follow model
        followers = ConnectionRequest.objects.filter(
            receiver=user, status='accepted'
        ).values_list('sender_id', flat=True)
        
        return list(followers)
    
    def get_following(self, obj):
        """Returns array of following user IDs (people they sent requests to)"""
        user = obj.user
        following = ConnectionRequest.objects.filter(
            sender=user, status='accepted'
        ).values_list('receiver_id', flat=True)
        
        return list(following)


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """
    Profile Update Serializer - allows updating specific fields
    Matches frontend formData structure from Profile.jsx
    """
    # Accept 'name' from frontend and split into first/last
    name = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = Profile
        fields = [
            'name',
            'headline',
            'bio',
            'avatar',
            'location',
            'college',
            'skills',
        ]
    
    def update(self, instance, validated_data):
        """
        Update profile, handling name field specially
        """
        # Handle name field if provided
        if 'name' in validated_data:
            full_name = validated_data.pop('name')
            if full_name:
                parts = full_name.split(' ', 1)
                instance.first_name = parts[0]
                instance.last_name = parts[1] if len(parts) > 1 else ''
        
        # Update remaining fields
        for field, value in validated_data.items():
            setattr(instance, field, value)
        
        instance.save()
        return instance
