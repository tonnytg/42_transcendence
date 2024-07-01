from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    nickname = models.CharField(max_length=50, blank=True)
    theme = models.CharField(max_length=50, blank=True)
    is_mfa_enabled = models.BooleanField(default=False)

    def __str__(self):
        return self.username