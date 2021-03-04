from django.db import models

class Debt(models.Model):
    """
    A class used to represent the database fields for a debt

    Attributes:
        debt_id (int): Primary Key
        balance (decimal): Balance of the debt
        interest_rate (decimal): Interest rate of the debt
        description (String): A short description of the debt
        payment (decimal): Payment made towards the debt
    """

    pass
