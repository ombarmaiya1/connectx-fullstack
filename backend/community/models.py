from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField

User = get_user_model()

class Discussion(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='discussions')
    tags = ArrayField(models.CharField(max_length=50), blank=True, default=list)
    likes = models.ManyToManyField(User, related_name='liked_discussions', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def replies(self):
        return self.comments.count()

class Comment(models.Model):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='discussion_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.email} on {self.discussion.title}"

class Event(models.Model):
    title = models.CharField(max_length=255)
    organizer = models.CharField(max_length=255) # Can be a string as per mock data, or link to User/Group
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.URLField(blank=True, null=True)
    tags = ArrayField(models.CharField(max_length=50), blank=True, default=list)
    attendees = models.ManyToManyField(User, related_name='attending_events', blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
