from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    name = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        name = validated_data.pop('name', '')
        
        first_name = ''
        last_name = ''
        if name:
            parts = name.split(' ', 1)
            first_name = parts[0]
            if len(parts) > 1:
                last_name = parts[1]

        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer that includes full profile data
    Used by /api/auth/me to populate AuthContext
    """
    # Profile fields (read from related profile)
    name = serializers.SerializerMethodField()
    headline = serializers.SerializerMethodField()
    bio = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    college = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    
    # Connection counts
    connections = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    
    # Rename date_joined to createdAt for frontend
    createdAt = serializers.DateTimeField(source='date_joined', read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 
            'email', 
            'name',
            'headline',
            'bio',
            'avatar',
            'location',
            'college',
            'skills',
            'connections',
            'followers',
            'following',
            'createdAt'
        ]
        read_only_fields = ['id', 'email', 'createdAt']
    
    def _get_profile(self, obj):
        """Helper to get or create profile"""
        from profiles.models import Profile
        profile, _ = Profile.objects.get_or_create(user=obj)
        return profile
    
    def get_name(self, obj):
        profile = self._get_profile(obj)
        return profile.name
    
    def get_headline(self, obj):
        profile = self._get_profile(obj)
        return profile.headline
    
    def get_bio(self, obj):
        profile = self._get_profile(obj)
        return profile.bio
    
    def get_avatar(self, obj):
        profile = self._get_profile(obj)
        return profile.avatar
    
    def get_location(self, obj):
        profile = self._get_profile(obj)
        return profile.location
    
    def get_college(self, obj):
        profile = self._get_profile(obj)
        return profile.college
    
    def get_skills(self, obj):
        profile = self._get_profile(obj)
        return profile.skills
    
    def get_connections(self, obj):
        """Returns array of connection user IDs"""
        from connections.models import ConnectionRequest
        sent = ConnectionRequest.objects.filter(
            sender=obj, status='accepted'
        ).values_list('receiver_id', flat=True)
        received = ConnectionRequest.objects.filter(
            receiver=obj, status='accepted'
        ).values_list('sender_id', flat=True)
        return list(set(list(sent) + list(received)))
    
    def get_followers(self, obj):
        """Returns array of follower user IDs"""
        from connections.models import ConnectionRequest
        followers = ConnectionRequest.objects.filter(
            receiver=obj, status='accepted'
        ).values_list('sender_id', flat=True)
        return list(followers)
    
    def get_following(self, obj):
        """Returns array of following user IDs"""
        from connections.models import ConnectionRequest
        following = ConnectionRequest.objects.filter(
            sender=obj, status='accepted'
        ).values_list('receiver_id', flat=True)
        return list(following)


# Custom JWT Serializer to accept email instead of username
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
