import decimal

from budgeting_tool.models import Expense
from budgeting_tool.serializers import ExpenseSerializer

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
        expense = Expense.objects.filter(user=request.user)
        expense_serializer = ExpenseSerializer(expense, many=True)

        for expense in expense_serializer.data:
            # expense["balance"] = decimal.Decimal(expense["balance"])
            #
            # holdings = Holding.objects.filter(pk__in=expense['holdings'])
            # holding_serializer = HoldingSerializer(holdings, many=True)
            #
            # for holding in holding_serializer.data:
            #     # return from model is a string, must be converted
            #     holding["price"] = decimal.Decimal(holding["price"])
            #     holding["shares"] = decimal.Decimal(holding["shares"])
            #     holding["cost_basis"] = decimal.Decimal(holding["cost_basis"])

            expense["holdings"] = holding_serializer.data

        return Response(expense_serializer.data)

    def post(self, request):
        """
        Add a new expense

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: JSON formatted data and HTTP status
        """
        request.data["user"] = request.user.pk
        expense_serializer = ExpenseSerializer(data=request.data)
        if expense_serializer.is_valid():
            expense_serializer.save()
            return Response(expense_serializer.data, status=status.HTTP_201_CREATED)
        return Response(expense_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExpenseDetail(APIView):
    """
    Get, update, or delete an individual expense
    """
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, key):
        try:
            return Expense.objects.get(pk=key)
        except Expense.DoesNotExist:
            raise Http404
    def get(self, request, key):
        """
        Get the specified expense

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the expense

        Returns:
            Response: JSON formatted data
        """
        expense = self.get_object(key)
        expense_serializer = ExpenseSerializer(expense)

        ps_data = expense_serializer.data

        # return from model is a string, must be converted
        ps_data["balance"] = decimal.Decimal(ps_data["balance"])

        # holdings = Holding.objects.filter(pk__in=ps_data['holdings'])
        # holding_serializer = HoldingSerializer(holdings, many=True)
        #
        # for holding in holding_serializer.data:
        #     # return from model is a string, must be converted
        #     holding["price"] = decimal.Decimal(holding["price"])
        #     holding["shares"] = decimal.Decimal(holding["shares"])
        #     holding["cost_basis"] = decimal.Decimal(holding["cost_basis"])
        #
        # ps_data["holdings"] = holding_serializer.data
        #
        # return Response(ps_data)

    def put(self, request, key):
        """
        Update the specified expense

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the expense

        Returns:
            Response: JSON formatted data and HTTP status
        """
        request.data["user"] = request.user.pk
        expense_serializer = ExpenseSerializer(data=request.data)
        if expense_serializer.is_valid():
            expense_serializer.save()
            return Response(expense_serializer.data, status=status.HTTP_201_CREATED)
        return Response(expense_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, key):
        """
        Delete the specified expense

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the expense

        Returns:
            Response: JSON formatted data and HTTP status
        """
        expense = self.get_object(key)
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)