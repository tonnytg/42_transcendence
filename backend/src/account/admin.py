from django.contrib import admin
from .models import CustomUser

# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'nickname', 'theme', 'is_mfa_enabled']  # Customize as needed
    # Add other configurations as needed