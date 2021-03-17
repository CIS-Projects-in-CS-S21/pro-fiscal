from django.db import models
from django.contrib.auth.models import User

class Account_Type(models.Model):
    """
    A class used to represent the database fields for the Account_Type table

    Attributes:
        id (int): Primary Key, automatically generated
        type (String): The type of account (Brokerage, IRA, 401K, etc)
    """
    type = models.CharField(max_length=50)


class Security_Type(models.Model):
    """
    A class used to represent the database fields for the Security_Type table

    Attributes:
        id (int): Primary Key, automatically generated
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
        balance (decimal): The current balance of the portfolio account
    """
    user = models.ForeignKey(User, related_name='portfolio_accounts', on_delete=models.CASCADE)
    account_type = models.ForeignKey(Account_Type, related_name='account_type', on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    balance = models.DecimalField(decimal_places=2, max_digits=15)

    def __repr__(self):
        return f"id:{self.id}\nuser:{self.user}\ntype:{self.account_type}\nname:{self.name}\nbalance:{self.balance}\ndescription:{self.description}"

    def __str__(self):
        return f"id: {self.id}, user: {self.user}, type: {self.account_type}, name: {self.name}, balance: {self.balance}, description: {self.description}"

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
    portfolio = models.ForeignKey(Portfolio, related_name='holdings', on_delete=models.CASCADE)
    security_type = models.ForeignKey(Security_Type, related_name='security_type', on_delete=models.SET_NULL, null=True, blank=True)
    ticker = models.CharField(max_length=5, null=True, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=15)
    shares = models.DecimalField(decimal_places=2, max_digits=15)
    purchase_date = models.DateField(null=True, blank=True)
    cost_basis = models.DecimalField(decimal_places=2, max_digits=15, null=True, blank=True)

    def __str__(self):
        return f"id: {self.id}, portfolio_id: {self.portfolio_id}, type: {self.security_type}, ticker: {self.ticker}, " \
               f"price: {self.price}, shares: {self.shares}, purchase_date: {self.purchase_date}, cost_basis: {self.cost_basis}"


class Balance_History(models.Model):
    """
    A class used to represent the database fields for balance history of portfolios

    Attributes:
        id (int): Primary Key, automatically generated
        portfolio (int): Foreign Key to the 'Portfolio' table
        balance (decimal): A previous balance of the portfolio
        date (Date): The data of the previous balance
    """

    portfolio = models.ForeignKey(Portfolio, related_name="balance_history", on_delete=models.CASCADE)
    balance = models.DecimalField(decimal_places=2, max_digits=15)
    date = models.DateField()


