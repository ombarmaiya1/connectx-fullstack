from rest_framework import serializers
from .models import Discussion, Event, Comment
from profiles.serializers import ProfileSerializer

class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.profile.full_name')
    author_avatar = serializers.ReadOnlyField(source='author.profile.avatar')

    class Meta:
        model = Comment
        fields = ['id', 'author', 'author_name', 'author_avatar', 'content', 'created_at']
        read_only_fields = ['author', 'created_at']

class DiscussionSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.profile.full_name')
    author_avatar = serializers.ReadOnlyField(source='author.profile.avatar')
    author_college = serializers.ReadOnlyField(source='author.profile.college')
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    replies_count = serializers.IntegerField(source='comments.count', read_only=True)
    is_liked = serializers.SerializerMethodField()
    match_score = serializers.SerializerMethodField()
    is_trending = serializers.SerializerMethodField()
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = Discussion
        fields = [
            'id', 'title', 'description', 'author', 'author_name', 
            'author_avatar', 'author_college', 'tags', 'likes_count', 
            'replies_count', 'created_at', 'is_liked', 'match_score', 
            'is_trending', 'time_ago'
        ]
        read_only_fields = ['author', 'created_at', 'likes_count', 'replies_count']

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False

    def get_match_score(self, obj):
        # SMART MODE: Basic mock match score logic
        # In real implementation, compare user skills with discussion tags
        return 90 # Placeholder

    def get_is_trending(self, obj):
        # Trending if > 5 likes or > 2 comments (arbitrary threshold for demo)
        return obj.likes.count() > 5 or obj.comments.count() > 2

    def get_time_ago(self, obj):
        from django.utils.timesince import timesince
        return timesince(obj.created_at) + " ago"

class EventSerializer(serializers.ModelSerializer):
    attendees_count = serializers.IntegerField(source='attendees.count', read_only=True)
    is_attending = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'organizer', 'date', 'location', 
            'description', 'image', 'tags', 'attendees_count', 
            'is_attending', 'formatted_date'
        ]
        read_only_fields = ['created_by', 'created_at', 'attendees_count']

    def get_is_attending(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.attendees.filter(id=user.id).exists()
        return False
    
    def get_formatted_date(self, obj):
        return obj.date.strftime('%b %d, %Y • %I:%M %p')
