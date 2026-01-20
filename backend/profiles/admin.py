from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'college', 'year', 'city', 'created_at']
    list_filter = ['college', 'year', 'city', 'state']
    search_fields = ['first_name', 'last_name', 'user__email', 'college', 'skills']
    readonly_fields = ['created_at', 'updated_at']
