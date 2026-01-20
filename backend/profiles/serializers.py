from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            'id',
            'user_id',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'college',
            'year',
            'pincode',
            'city',
            'state',
            'skills',
            'bio',
            'linkedin_url',
            'github_url',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'user_id', 'email', 'created_at', 'updated_at']


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'first_name',
            'last_name',
            'college',
            'year',
            'pincode',
            'city',
            'state',
            'skills',
            'bio',
            'linkedin_url',
            'github_url',
        ]
