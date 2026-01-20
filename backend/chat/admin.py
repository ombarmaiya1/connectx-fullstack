from django.contrib import admin
from .models import ChatRoom, Message


class MessageInline(admin.TabularInline):
    model = Message
    extra = 0
    readonly_fields = ['sender', 'content', 'timestamp']
    can_delete = False


@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'get_users', 'created_at', 'updated_at']
    filter_horizontal = ['users']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [MessageInline]
    
    def get_users(self, obj):
        return ', '.join([user.email for user in obj.users.all()])
    get_users.short_description = 'Users'


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'room', 'sender', 'content_preview', 'timestamp', 'is_read']
    list_filter = ['timestamp', 'is_read']
    search_fields = ['content', 'sender__email']
    readonly_fields = ['timestamp']
    
    def content_preview(self, obj):
        return obj.content[:50]
    content_preview.short_description = 'Content'
