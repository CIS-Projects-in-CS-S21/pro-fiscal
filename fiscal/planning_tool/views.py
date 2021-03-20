import decimal

from planning_tool.models import Holding, Balance_History
from planning_tool.models import Portfolio
from planning_tool.serializers import PortfolioSerializer, HoldingSerializer, BalanceHistorySerializer

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.db.models.functions import Now


def fetch_balance_history(portfolio_data):
    """
    A function to query data from the balance history table and build a dictionary of the values
    
    Arguments:
        portfolio_data (dict): Portfolio data
        
    Returns:
        A dict with all the balance history values associated with this portfolio
    """
    history = Balance_History.objects.filter(pk__in=portfolio_data['balance_history'])
    history_serializer = BalanceHistorySerializer(history, many=True)

    balance_history = {"balance": [], "date": []}
    for balance in history_serializer.data:
        balance["balance"] = decimal.Decimal(balance["balance"])
        balance_history["balance"].append(balance["balance"])
        balance_history["date"].append(balance["date"])

    return balance_history

def fetch_holdings(portfolio_data):
    """
    A function to query data from the holdings table
    
    Arguments:
        portfolio_data (dict): Portfolio data

    Returns:
        A list of all the holdings associated with this portfolio
    """
    holdings = Holding.objects.filter(pk__in=portfolio_data['holdings'])
    holding_serializer = HoldingSerializer(holdings, many=True)

    for holding in holding_serializer.data:
        # return from model is a string, must be converted
        holding["price"] = decimal.Decimal(holding["price"])
        holding["shares"] = decimal.Decimal(holding["shares"])
        if holding["cost_basis"]:
            holding["cost_basis"] = decimal.Decimal(holding["cost_basis"])
        
    return holding_serializer.data


class PortfolioList(APIView):
    """
    List all accounts, or add a new one

    Attributes:
        permission_classes (list): A list of the accepted permissions for this view
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
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

            portfolio["holdings"] = fetch_holdings(portfolio)            
            portfolio["balance_history"] = fetch_balance_history(portfolio)

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

    def get(self, request, pk, format=None):
        """
        Get the specified portfolio account

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            pk (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data
        """
        portfolio = self.get_object(pk)
        portfolio_serializer = PortfolioSerializer(portfolio)

        ps_data = portfolio_serializer.data

        # return from model is a string, must be converted
        ps_data["balance"] = decimal.Decimal(ps_data["balance"])        

        ps_data["holdings"] = fetch_holdings(ps_data)
        ps_data["balance_history"] = fetch_balance_history(ps_data)

        return Response(ps_data)

    def put(self, request, pk, format=None):
        """
        Update the specified portfolio account

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            pk (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data and HTTP status
        """
        old_data = self.get_object(pk)
        new_history = Balance_History(portfolio=old_data, balance=old_data.balance)
        new_history.save()

        request.data["user"] = request.user.pk
        portfolio_serializer = PortfolioSerializer(old_data, data=request.data)
        if portfolio_serializer.is_valid():
            portfolio_serializer.save()

            ps_data = portfolio_serializer.data            
            ps_data["balance_history"] = fetch_balance_history(ps_data)

            return Response(ps_data, status=status.HTTP_200_OK)
        return Response(portfolio_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete the specified portfolio account

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            pk (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data and HTTP status
        """
        portfolio = self.get_object(pk)
        portfolio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class HoldingList(APIView):
    def get(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request):
        holding_serializer = HoldingSerializer(data=request.data)
        if holding_serializer.is_valid():
            holding_serializer.save()
            return Response(holding_serializer.data, status=status.HTTP_201_CREATED)
        return Response(holding_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HoldingDetail(APIView):
    """
    Get, update, or delete an individual holding

    Attributes:
        permission_classes (list): A list of the accepted permissions for this view
    """

    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self, key):
        try:
            return Holding.objects.get(pk=key)
        except Holding.DoesNotExist:
            raise Http404
    
    def get(self, request, pk):
        holding = self.get_object(pk)
        holding_serializer = HoldingSerializer(holding)

        h_data = holding_serializer.data
        h_data["price"] = decimal.Decimal(h_data["price"])
        h_data["shares"] = decimal.Decimal(h_data["shares"])
        h_data["cost_basis"] = decimal.Decimal(h_data["cost_basis"])

        return Response(h_data)
    
    def put(self, request, pk):
        holding_serializer = HoldingSerializer(data=request.data)
        if holding_serializer.is_valid():
            holding_serializer.save()
            return Response(holding_serializer.data, status=status.HTTP_200_OK)
        return Response(holding_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        holding = self.get_object(pk)
        holding.delete()
        return Response(status=status.HTTP_204_NO_CONTENT);
