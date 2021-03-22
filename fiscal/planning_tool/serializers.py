from rest_framework import serializers
from django.contrib.auth.models import User
from planning_tool.models import Portfolio, Holding, Security_Type, Account_Type, Balance_History


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
        security_type (Serializer): field for the reversely related security type
    """

    security_type = serializers.SlugRelatedField(slug_field="type", queryset=Security_Type.objects.all(), allow_null=True)

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
        holdings (Serializer): Field for the reversely related holdings
        balance_history (Serializer): Field for the reversely related balance history
        account_type (Serializer): Field for the reversely related account type
    """

    holdings = serializers.PrimaryKeyRelatedField(many=True, read_only=True, allow_null=True)
    balance_history = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    account_type = serializers.SlugRelatedField(slug_field='type', queryset=Account_Type.objects.all(), allow_null=True)
    class Meta:
        """
        Attributes:
            model (__class__): The Portfolio model class
            fields (list): A list of the fields in the Portfolio model
        """
        model = Portfolio
        fields = ['id', 'user', 'account_type', 'name', 'description', 'balance', 'balance_history', 'holdings']


class BalanceHistorySerializer(serializers.ModelSerializer):
    """
        A class to serialize and deserialize Balance_History instances to and from JSON data
    """

    class Meta:
        model = Balance_History
        fields = ['id', 'portfolio', 'balance', 'date']


class UserSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize User instances to and from JSON data

    Attributes:
        portfolio_accounts (Serializer): Field for the reversely related portfolio accounts
    """
    portfolio_accounts = serializers.PrimaryKeyRelatedField(many=True, queryset=Portfolio.objects.all(), allow_null=True)

    class Meta:
        """
        Attributes:
            model (__class__): The User model class
            fields (list): A list of the fields in the User model
        """
        model = User
        fields = ['id', 'username', 'portfolio_accounts']
