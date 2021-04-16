from django.test import TestCase
from budget_tool.serializers import *
from django.contrib.auth.models import User

class SerializerTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User(username="Test", password="fiscaltest")
        cls.user.save()

        cls.existing = Expense.objects.create(user_id=cls.user.id, amount=100, transaction_date="2021-03-05",
                                              description="Rent Payment", category="Essential")

        cls.success_data = {
            "user": cls.user.id,
            "amount": 100.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

    def test_expense_validity(self):
        serializer = ExpenseSerializer(data=self.success_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_expense_create(self):
        serializer = ExpenseSerializer(data=self.success_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertTrue(isinstance(serializer.save(), Expense), serializer.errors)

    def test_expense_update(self):
        update_data = {
            "user": self.user.id,
            "amount": 100,
            "transaction_date": "2021-03-05",
            "description": "March Rent Payment",
            "category": "Housing"
        }
        serializer = ExpenseSerializer(self.existing, data=update_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertTrue(isinstance(serializer.save(), Expense), serializer.errors)

    def test_expense_contains_expected_fields(self):
        serializer = ExpenseSerializer(self.existing)
        self.assertEqual(set(serializer.data.keys()),
                         set(self.success_data.keys()).union(["id"]))


