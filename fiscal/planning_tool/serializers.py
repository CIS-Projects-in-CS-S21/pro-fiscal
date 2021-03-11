from rest_framework import serializers
from django.contrib.auth.models import User
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
        security_type (Serializer): field for the reversely related security type
    """
    security_type = Security_TypeSerializer(many=False)

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
        account_type (Serializer): Field for the reversely related account type
    """
    holdings = HoldingSerializer(many=True)
    account_type = Account_TypeSerializer(many=False)

    class Meta:
        """
        Attributes:
            model (__class__): The Portfolio model class
            fields (list): A list of the fields in the Portfolio model
        """
        model = Portfolio
        fields = ['id', 'user', 'account_type', 'name', 'description', 'balance', 'holdings']

    def create(self, validated_data):
        holdings_data = validated_data.pop('holdings')
        portfolio = Portfolio.objects.create(**validated_data)
        for holding in holdings_data:
            Holding.objects.create(portfolio=portfolio, **holding)
        return portfolio

    def update(self, instance, validated_data):
        holdings_data = validated_data.pop('holdings')
        holdings = (instance.holdings).all()
        holdings = list(holdings)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.balance = validated_data.get('balance', instance.description)
        instance.save()

        for holding_data in holdings_data:
            holding = holdings.pop(0)
            holding.ticker = holding_data.get('ticker', holding.ticker)
            holding.price = holding_data.get('price', holding.price)
            holding.shares = holding_data.get('shares', holding.shares)
            holding.purchase_date = holding_data.get('purchase_date', holding.purchase_date)
            holding.cost_basis = holding_data.get('cost_basis', holding.cost_basis)
            holding.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize User instances to and from JSON data

    Attributes:
        portfolio_accounts (Serializer): Field for the reversely related portfolio accounts
    """
    portfolio_accounts = PortfolioSerializer(many=True)

    class Meta:
        """
        Attributes:
            model (__class__): The User model class
            fields (list): A list of the fields in the User model
        """
        model = User
        fields = ['id', 'username', 'portfolio_accounts']
