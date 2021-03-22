import decimal

from planning_tool.models import Holding
from planning_tool.serializers import HoldingSerializer
from planning_tool.models import Portfolio
from planning_tool.serializers import PortfolioSerializer

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

class ExpenseList(APIView):
    """
    List all expenses, or create a new one
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Get the list of expenses

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: list of expenses in JSON format
        """
        pass

    def post(self, request):
        """
        Add a new expense

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass

class ExpenseDetail(APIView):
    """
    Get, update, or delete an individual expense
    """

    def get(self, request, key):
        """
        Get the specified expense

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the expense

        Returns:
            Response: JSON formatted data
        """
        pass

    def put(self, request, key):
        """
        Update the specified expense

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the expense

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass

    def delete(self, request, key):
        """
        Delete the specified expense

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the expense

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass