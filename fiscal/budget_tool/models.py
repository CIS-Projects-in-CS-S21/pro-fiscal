from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
class Expense(models.Model):

    """
    A class used to represent the database fields for an expense

    Attributes:
        expense_id (int): The primary key
        user_id (int): Foreign key to table 'User'
        amount (decimal): Expense amount
        transaction_date (Date): Date of the expense
        description (String): Short description of the expense
        category (String): Category of the expense
    """
    expense_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(User, related_name='expense', on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=20)
    transaction_date = models.DateField(default=timezone.now)
    description = models.TextField()
    category = models.CharField(max_length=230)


def __str__(self):
    return self.expense_id, self.user_id, self.amount, self.transaction_date, self.description, self.category
