from django.db import models

# class Portfolio(models.Model):
#     """
#     A class used to represent the database fields for a portfolio of accounts
#
#     Attributes:
#         portfolio_id (int): Primary Key
#         user_id (int): Foreign Key to the 'User' table
#         account_type (int): Foreign Key to the 'Account_Type' table
#         name (String): The name of the portfolio account
#         description (String): A description of the portfolio account
#     """
#
#     pass
#
# class Holding(models.Model):
#     """
#     A class used to represent the database fields for an account holding
#
#     Attributes:
#         holding_id (int): Primary Key
#         portfolio_id (int): Foreign key to the related 'Portfolio' table
#         security_type (int): Foreign key to the 'Security_Type' table
#         ticker (String): Ticker symbol for the holding
#         price (decimal): Price of the holding
#         shares (decimal): Number of shares in the holding
#         purchase_date (Date): Purchase date of the holding
#         cost_basis (decimal): Cost Basis value for the holding
#     """
#
#     pass
