from rest_framework import serializers
from django.contrib.auth.models import User
from utils.models import MonteResults


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined']


class MonteResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonteResults
        fields = ["id", "user", "results", "date"]

