from planning_tool.models import Account_Type
from planning_tool.models import Holding
from planning_tool.serializers import HoldingSerializer

from planning_tool.models import Portfolio
from planning_tool.serializers import PortfolioSerializer


from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

class PortfolioList(APIView):
    """
    List all accounts, or add a new one
    """

    def get(self, request, format = None):
        """
        Get the list of accounts

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: list of account in JSON format
        """

        portfolio = Portfolio.objects.filter(user=request.user)
        portfolio_serializer = PortfolioSerializer(portfolio, many=True)

        ps_data = portfolio_serializer.data
        for portfolio in ps_data:
            holdings = Holding.objects.filter(pk__in=portfolio['holdings'])
            portfolio["holdings"] = list(holdings)

        print(ps_data)
        return Response(ps_data.data)

    def post(self, request, format = None):
        """
        Add a new account

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: JSON formatted data and HTTP status
        """
        request.data["user"] = request.user.pk
        portfolio_serializer = PortfolioSerializer(data=request.data)
        if portfolio_serializer.is_valid():
            portfolio_serializer.save()
            return Response(portfolio_serializer.data, status=status.HTTP_201_CREATED)
        return Response(portfolio_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PortfolioDetail(APIView):
    """
    Get, update, or delete an individual portfolio account
    """

    def get_object(self, key):
        try:
            return Holding.objects.get(key=key)
        except Holding.DoesNotExist:
            raise Http404

    def get(self, request, key, format=None):
        """
        Get the specified portfolio account

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data
        """
        portfolio = Portfolio.objects.filter(user=request.user)
        portfolio_serializer = PortfolioSerializer(portfolio, many=True)

        ps_data = portfolio_serializer.data
        for portfolio in ps_data:
            holdings = Holding.objects.filter(pk__in=portfolio['holdings'])
            portfolio["holdings"] = list(holdings)

        print(ps_data)
        return Response(ps_data.data)

    def put(self, request, key, format=None):
        """
        Update the specified portfolio account

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data and HTTP status
        """
        request.data["user"] = request.user.pk
        portfolio_serializer = PortfolioSerializer(data=request.data)
        if portfolio_serializer.is_valid():
            portfolio_serializer.save()
            return Response(portfolio_serializer.data, status=status.HTTP_201_CREATED)
        return Response(portfolio_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, key, format=None):
        """
        Delete the specified portfolio account

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data and HTTP status
        """
        holding = self.get_object(key)
        holding.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        pass