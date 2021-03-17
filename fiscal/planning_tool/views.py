import decimal

from planning_tool.models import Holding, Balance_History
from planning_tool.models import Portfolio
from planning_tool.serializers import PortfolioSerializer, HoldingSerializer, BalanceHistorySerializer

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


class PortfolioList(APIView):
    """
    List all accounts, or add a new one

    Attributes:
        permission_classes (list): A list of the accepted permissions for this view
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """
        Get the list of accounts

        Arguments:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: list of account in JSON format
        """

        portfolio = Portfolio.objects.filter(user=request.user)
        portfolio_serializer = PortfolioSerializer(portfolio, many=True)

        for portfolio in portfolio_serializer.data:
            portfolio["balance"] = decimal.Decimal(portfolio["balance"])

            holdings = Holding.objects.filter(pk__in=portfolio['holdings'])
            holding_serializer = HoldingSerializer(holdings, many=True)

            for holding in holding_serializer.data:
                # return from model is a string, must be converted
                holding["price"] = decimal.Decimal(holding["price"])
                holding["shares"] = decimal.Decimal(holding["shares"])
                holding["cost_basis"] = decimal.Decimal(holding["cost_basis"])

            portfolio["holdings"] = holding_serializer.data

            history = Balance_History.objects.filter(pk__in=portfolio['balance_history'])
            history_serializer = BalanceHistorySerializer(history, many=True)

            balance_history = {"balance": [], "date": []}
            for balance in history_serializer.data:
                balance["balance"] = decimal.Decimal(balance["balance"])
                balance_history["balance"].append(balance["balance"])
                balance_history["date"].append(balance["date"])

            portfolio["balance_history"] = balance_history

        return Response(portfolio_serializer.data)

    def post(self, request, format=None):
        """
        Add a new account

        Arguments:
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

    Attributes:
        permission_classes (list): A list of the accepted permissions for this view
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, key):
        try:
            return Portfolio.objects.get(pk=key)
        except Portfolio.DoesNotExist:
            raise Http404

    def get(self, request, key, format=None):
        """
        Get the specified portfolio account

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data
        """
        portfolio = self.get_object(key)
        portfolio_serializer = PortfolioSerializer(portfolio)

        ps_data = portfolio_serializer.data

        # return from model is a string, must be converted
        ps_data["balance"] = decimal.Decimal(ps_data["balance"])

        holdings = Holding.objects.filter(pk__in=ps_data['holdings'])
        holding_serializer = HoldingSerializer(holdings, many=True)

        for holding in holding_serializer.data:
            # return from model is a string, must be converted
            holding["price"] = decimal.Decimal(holding["price"])
            holding["shares"] = decimal.Decimal(holding["shares"])
            holding["cost_basis"] = decimal.Decimal(holding["cost_basis"])

        ps_data["holdings"] = holding_serializer.data

        return Response(ps_data)

    def put(self, request, key, format=None):
        """
        Update the specified portfolio account

        Arguments:
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

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data and HTTP status
        """
        portfolio = self.get_object(key)
        portfolio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
