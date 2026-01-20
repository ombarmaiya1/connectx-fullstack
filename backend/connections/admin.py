from django.contrib import admin
from .models import ConnectionRequest


@admin.register(ConnectionRequest)
class ConnectionRequestAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'status', 'created_at', 'updated_at']
    list_filter = ['status', 'created_at']
    search_fields = ['sender__email', 'receiver__email']
    readonly_fields = ['created_at', 'updated_at']
