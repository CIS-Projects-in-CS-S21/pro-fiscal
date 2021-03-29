from rest_framework import serializers
from budget_tool.models import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize Expense instances
    """

    class Meta:
        """
        Attributes:
            model (__class__): The Expense model class
            fields (list): A list of the fields in the Expense model
        """
        model = Expense
        fields = ['expense_id', 'user', 'amount', 'transaction_date', 'description', 'category']