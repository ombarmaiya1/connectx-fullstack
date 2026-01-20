from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Basic Info
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    headline = models.CharField(max_length=255, blank=True)  # NEW: Professional headline
    bio = models.TextField(blank=True)
    avatar = models.TextField(blank=True)  # NEW: Base64 or URL
    
    # Location Info
    location = models.CharField(max_length=200, blank=True)  # NEW: City, State format
    college = models.CharField(max_length=200, blank=True)
    year = models.CharField(max_length=20, blank=True)
    pincode = models.CharField(max_length=10, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    
    # Skills & Links
    skills = models.TextField(blank=True)  # Store as JSON string
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    
    # Online Status (for network discovery)
    is_online = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.full_name} ({self.user.email})"
    
    @property
    def full_name(self):
        """Returns full name or email if name fields are empty"""
        if self.first_name or self.last_name:
            return f"{self.first_name} {self.last_name}".strip()
        return self.user.email.split('@')[0]
    
    @property
    def name(self):
        """Alias for full_name to match frontend expectations"""
        return self.full_name
    
    @property
    def title(self):
        """Returns headline as title for frontend compatibility"""
        return self.headline if self.headline else ""
