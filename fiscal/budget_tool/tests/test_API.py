from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from rest_framework import status
from budget_tool.models import *



class BudgetToolAPITest(TestCase):
    """
    A class to test the integration of different components in the Budget Tool API
    """

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="Test2", password="fiscaltest", email="test2@test.com")
        cls.token = Token.objects.create(user=cls.user)

        cls.expense = Expense.objects.create(user=cls.user, amount=1000, transaction_date="2021-03-05",
                                              description="Rent Payment", category="Housing")

        cls.success_data = {
            "amount": 500,
            "transaction_date": "2020-12-30",
            "description": "Independence Blue Cross",
            "category": "Other"
        }

        cls.failure_data = {
            "transaction_date": "2020-12-30",
            "description": "Independence Blue Cross",
            "category": "Other"
        }

    def setUp(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_get_expenses_no_login(self):
        self.client.credentials()
        resp = self.client.get('/expense/expense/', format='json')
        self.assertEquals(resp.status_code, status.HTTP_401_UNAUTHORIZED,
                          "User should not be able to access API unless logged in")

    def test_get_expenses_logged_in(self):
        resp = self.client.get('/expense/expense/', format='json')
        self.assertEquals(resp.status_code, status.HTTP_200_OK)
        self.assertTrue(isinstance(resp.data, list), "Get should return a list of expenses")

    def test_new_expense_success(self):
        resp = self.client.post('/expense/expense/', self.success_data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_201_CREATED, resp.data)

    def test_new_expense_failure(self):
        resp = self.client.post('/expense/expense/', self.failure_data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_400_BAD_REQUEST, resp.data)
        self.assertTrue(resp.data["amount"], "There should be an error message for amount")

    def test_update_portfolio_success(self):
        resp = self.client.put('/expense/expense/' + str(self.expense.id), self.success_data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_200_OK, resp.data)

    def test_update_portfolio_failure(self):
        resp = self.client.put('/expense/expense/' + str(self.expense.id), self.failure_data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_400_BAD_REQUEST, resp.data)
        self.assertTrue(resp.data["amount"], "There should be an error message for amount")