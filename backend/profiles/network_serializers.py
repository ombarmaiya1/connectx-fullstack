from rest_framework import serializers
from django.db.models import Q
from .models import Profile
from connections.models import ConnectionRequest


class NetworkUserSerializer(serializers.ModelSerializer):
    """
    Serializer for Network Page user cards
    Maps backend fields to frontend expectations from Network.jsx
    """
    # User fields
    id = serializers.IntegerField(source='user.id', read_only=True)
    name = serializers.SerializerMethodField()
    title = serializers.CharField(source='headline', read_only=True)
    role = serializers.CharField(source='headline', read_only=True)  # Alias for title
    
    # Profile fields with frontend naming
    profileImage = serializers.CharField(source='avatar', read_only=True)
    isOnline = serializers.BooleanField(source='is_online', read_only=True)
    
    # Social links
    github = serializers.URLField(source='github_url', read_only=True)
    linkedin = serializers.URLField(source='linkedin_url', read_only=True)
    
    # Computed fields
    connectionStatus = serializers.SerializerMethodField()
    matchScore = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = [
            'id',
            'name',
            'title',
            'role',
            'bio',
            'location',
            'skills',
            'profileImage',
            'isOnline',
            'github',
            'linkedin',
            'connectionStatus',
            'matchScore',
        ]
    
    def get_name(self, obj):
        """Returns full name"""
        return obj.name
    
    def get_connectionStatus(self, obj):
        """
        Returns connection status between logged-in user and this user
        Values: "not_connected", "pending", "connected"
        """
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return "not_connected"
        
        # Don't check connection with self
        if obj.user.id == request.user.id:
            return "not_connected"
        
        # Check for existing connection request
        connection = ConnectionRequest.objects.filter(
            Q(sender=request.user, receiver=obj.user) |
            Q(sender=obj.user, receiver=request.user)
        ).first()
        
        if not connection:
            return "not_connected"
        
        # Map backend status to frontend status
        status_map = {
            'pending': 'pending',
            'accepted': 'connected',
            'rejected': 'not_connected',
        }
        return status_map.get(connection.status, 'not_connected')
    
    def get_matchScore(self, obj):
        """
        Calculate skill-based match score (0-100)
        Returns None if no logged-in user or include_match_score not requested
        """
        request = self.context.get('request')
        include_match_score = self.context.get('include_match_score', False)
        
        if not include_match_score or not request or not request.user.is_authenticated:
            return None
        
        try:
            # Get logged-in user's profile
            current_profile = request.user.profile
            current_skills = set(skill.lower() for skill in current_profile.skills)
            target_skills = set(skill.lower() for skill in obj.skills)
            
            # If either user has no skills, return 0
            if not current_skills or not target_skills:
                return 0
            
            # Calculate Jaccard similarity (intersection / union)
            intersection = len(current_skills & target_skills)
            union = len(current_skills | target_skills)
            
            if union == 0:
                return 0
            
            # Return as percentage (0-100)
            return round((intersection / union) * 100)
        
        except Exception:
            return 0
