from django.db import models
from django.contrib.auth.models import User


class MonteResults(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    results = models.JSONField(null=True)
    date = models.DateTimeField(auto_now=True)
    running = models.BooleanField(default=False)
