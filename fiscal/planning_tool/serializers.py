from rest_framework import serializers
from planning_tool.models import Portfolio, Holding, Security_Type, Account_Type

class Security_TypeSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize Security_Type instances to and from JSON data
    """

    class Meta:
        """
        Attributes:
            model (__class__): The Holding model class
            fields (list): A list of the fields in the Security_Type model
        """
        model = Security_Type
        fields = ['id', 'type']


class Account_TypeSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize Account_Type instances to and from JSON data
    """

    class Meta:
        """
        Attributes:
            model (__class__): The Holding model class
            fields (list): A list of the fields in the Account_Type model
        """
        model = Account_Type
        fields = ['id', 'type']


class HoldingSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize Holding instances to and from JSON data

    Attributes:
        type (Serializer): The serializer for the related security type
    """
    type = Security_Type()

    class Meta:
        """
        Attributes:
            model (__class__): The Holding model class
            fields (list): A list of the fields in the Holding model
        """
        model = Holding
        fields = ['id', 'portfolio', 'security_type', 'ticker', 'price', 'shares', 'purchase_date', 'cost_basis']

class PortfolioSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize Portfolio instances to and from JSON data

    Attributes:
        holdings (Serializer): The serializer for related holdings
        type (Serializer): The serializer for the related security type
    """
    holdings = HoldingSerializer(many=True)
    type = Account_Type()

    class Meta:
        """
        Attributes:
            model (__class__): The Portfolio model class
            fields (list): A list of the fields in the Portfolio model
        """
        model = Portfolio
        fields = ['id', 'user', 'account_type', 'name', 'description', 'balance', 'holdings']

