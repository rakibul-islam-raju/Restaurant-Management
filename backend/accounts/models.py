from django.db import models
from django.contrib.auth.models import AbstractUser

from accounts.managers import UserManager


class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField("Email Address", unique=True)
    password = models.CharField(max_length=255)
    image = models.ImageField(upload_to="profile_pictures/", blank=True, null=True)
    username = None

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def full_name(self):
        if self.first_name and self.last_login:
            return f"{self.first_name} {self.last_name}"
        else:
            return None
