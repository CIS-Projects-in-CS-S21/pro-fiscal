from fiscal.planning_tool.models import Account_Type
from fiscal.planning_tool.serializers import Account_TypeSerializer

from fiscal.planning_tool.models import Security_Type
from fiscal.planning_tool.serializers import Security_TypeSerializer

from fiscal.planning_tool.models import Holding
from fiscal.planning_tool.serializers import HoldingSerializer

from fiscal.planning_tool.models import Portfolio
from fiscal.planning_tool.serializers import PortfolioSerializer

from fiscal.planning_tool.serializers import UserSerializer

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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

        portfolio = Portfolio.objects.filter(request=request.user)
        portfolio_serializer = PortfolioSerializer(portfolio, many=True)

        ps_data = portfolio_serializer.data
        holdings = Holding.objects.filter(pk__in=ps_data.holding)
        ps_data["holdings"] = list(holdings)

        return Response(ps_data.data)
        pass

    def post(self, request, format = None):
        """
        Add a new account

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: JSON formatted data and HTTP status
        """
        holdings_serializer = HoldingSerializer(data=request.data)
        if holdings_serializer.is_valid():
            holdings_serializer.save()
            return Response(holdings_serializer.data, status=status.HTTP_201_CREATED)
        return Response(holdings_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        pass

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
        holding = self.get_object(key)
        holdings_serializer = HoldingSerializer(holding)
        return Response(holdings_serializer.data)


        pass

    def put(self, request, key, format=None):
        """
        Update the specified portfolio account

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data and HTTP status
        """
        holding = self.get_object(key)
        holdings_serializer = HoldingSerializer(holding)

        if holdings_serializer.is_valid():
            holdings_serializer.save()
            return Response(holdings_serializer.data)
        return Response(holdings_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        pass

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