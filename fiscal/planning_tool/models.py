from django.db import models
from django.contrib.auth.models import User

class Account_Type(models.Model):
    """
    A class used to represent the database fields for the Account_Type table

    Attributes:
        id (int): Primary Key, , automatically generated
        type (String): The type of account (Brokerage, IRA, 401K, etc)
    """
    type = models.CharField(max_length=50)


class Security_Type(models.Model):
    """
    A class used to represent the database fields for the Security_Type table

    Attributes:
        id (int): Primary Key, , automatically generated
        type (String): The type of security (Stock, Bond, etc)
    """
    type = models.CharField(max_length=50)

class Portfolio(models.Model):
    """
    A class used to represent the database fields for a portfolio of accounts

    Attributes:
        id (int): Primary Key, automatically generated
        user (int): Foreign Key to the 'User' table
        account_type (int): Foreign Key to the 'Account_Type' table
        name (String): The name of the portfolio account
        description (String): A description of the portfolio account
        balance (decimal): The balance of the portfolio account
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_type = models.ForeignKey(Account_Type, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    balance = models.DecimalField(decimal_places=2, max_digits=15)


class Holding(models.Model):
    """
    A class used to represent the database fields for an account holding

    Attributes:
        id (int): Primary Key, , automatically generated
        portfolio (int): Foreign key to the related 'Portfolio' table
        security_type (int): Foreign key to the 'Security_Type' table
        ticker (String): Ticker symbol for the holding
        price (decimal): Price of the holding
        shares (decimal): Number of shares in the holding
        purchase_date (Date): Purchase date of the holding
        cost_basis (decimal): Cost Basis value for the holding
    """
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    security_type = models.ForeignKey(Security_Type, on_delete=models.SET_NULL, null=True, blank=True)
    ticker = models.CharField(max_length=5, null=True, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=15)
    shares = models.DecimalField(decimal_places=2, max_digits=15)
    purchase_date = models.DateField(null=True, blank=True)
    cost_basis = models.DecimalField(decimal_places=2, max_digits=15, null=True, blank=True)




