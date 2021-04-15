import datetime

from django.test import TestCase
from rest_framework.test import APIRequestFactory

from budget_tool.views import *
from budget_tool.serializers import *
from budget_tool.models import *

class ListViewTest(TestCase):

    def setUp(self):

        self.user = User(username="Test", password="fiscaltest")
        self.user.save()

        self.factory = APIRequestFactory()

        self.success_data = {
            "id": 1,
            "user": 1,
            "amount": 100.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

    def test_get_expenseList_no_entries(self):
        request = self.factory.get("expense/")
        request.user = self.user

        view = ExpenseList()
        view.setup(request)
        resp = view.get(request)

        self.assertEquals(resp.status_code, 200)
        self.assertTrue(not resp.data, "Response data should be empty")

    def test_get_expenseList_with_entries(self):
        # exp = ExpenseSerializer(data=self.success_data)
        # exp.is_valid()
        # exp.save()
        Expense.objects.create(id=1, user_id=1,amount= 100.50, transaction_date = "2021-03-29", description = "Fi$cal merch", category = "Essential"  )

        request = self.factory.get("expense/")
        request.user = self.user

        view = ExpenseList()
        view.setup(request)
        resp = view.get(request)

        self.assertEquals(resp.status_code, 200, msg=resp.data)
        self.assertTrue(resp.data, "Response data should not be empty")

    def test_post_expenseList_success(self):
        request = self.factory.post("expense/", data=self.success_data, format="json")
        request.user = self.user
        request.data = self.success_data

        view = ExpenseList()
        view.setup(request)
        resp = view.post(request)

        self.assertEquals(resp.status_code, 201)

    def test_post_expenseList_fail(self):
        data = {
            "user": None,
            "name": "This Will Not Work",
            "amount": 0.00
        }
        request = self.factory.post("expense/", data=data, format="json")
        request.user = self.user
        request.data = data

        view = ExpenseList()
        view.setup(request)
        resp = view.post(request)

        self.assertEquals(resp.status_code, 400)

    def test_get_success(self):
        # Add the data to the test DB

        new_exp = {
            "id": 1,
            "user": self.user,
            "amount": 500.00,
            "transaction_date": "2021-03-30",
            "description": "Nike merch",
            "category": "Essential"
        }
        """exp = Expense.objects.create(**new_exp)"""

        data = {
            "user": self.user,
            "name": "This Will Not Work",
            "amount": 0.00
        }
        request = self.factory.get("expense/", data=data, format="json")
        request.user = self.user
        request.data = data

        view = ExpenseList()
        view.setup(request)
        resp = view.get(request)

        print(resp.data)

        self.assertEquals(resp.status_code, 200)

    def test_post_success(self):

        data = {
            "id": 1,
            "user": 1,
            "amount": 100.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": ""
        }
        request = self.factory.post("expense/", data=data, format="json")
        request.user = self.user
        request.data = data

        view = ExpenseList()
        view.setup(request)
        resp = view.post(request)

        self.assertNotEquals(resp.data["category"], "", "Category should be added")
        self.assertEquals(resp.status_code, 201)


class DetailViewTest(TestCase):

    def setUp(self):

        self.user = User(username="Test", password="fiscaltest")
        self.user.save()

        self.factory = APIRequestFactory()

        self.success_data = {
            "id": 1,
            "user": 1,
            "amount": 100.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

        self.exp_1 = Expense(user_id=1, amount=250.00, transaction_date= "2021-03-29", description="Fi$cal merch", category="Essential")
        self.exp_1.save()

        self.expected_data = {
            "id": 1,
            "user": 1,
            "amount": 250.00,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }
    def test_get_success(self):
        request = self.factory.get("expense/1")
        request.user = self.user

        view = ExpenseDetail()
        view.setup(request)

        resp = view.get(request, 1)

        self.assertEquals(resp.status_code, 200)

    def test_get_portfolioDetail_expected_format(self):
        """
        Verify that a get call to the view returns data with the correct keys and expected formats
        """

        # Add the data to the test DB
        new_exp = {
            "id": 1,
            "user": 1,
            "amount": 600.50,
            "transaction_date": "2021-03-30",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

        """exp = Expense.objects.create(**new_exp)"""

        # Get response and test against expected values
        request = self.factory.get("expense/1")
        request.user = self.user

        view = ExpenseDetail()
        view.setup(request)
        resp = view.get(request, 1)

        self.assertEquals(resp.status_code, 200)
        for field in self.expected_data.keys():
            self.assertEquals(resp.data[field], self.expected_data[field], f"Unexpected value in portfolio for {field}")

    def test_put_portFolioDetail(self):
        data = {
            "id": 1,
            "user": 1,
            "amount": 600.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

        request = self.factory.put("expense/1")
        request.user = self.user
        request.data = data

        view = ExpenseDetail()
        view.setup(request)
        resp = view.put(request, 1)

        self.assertEquals(resp.status_code, 201, msg=resp.data)

    def test_delete_portFolioDetail(self):
        request = self.factory.delete("expense/1")
        request.user = self.user

        view = ExpenseDetail()
        view.setup(request)
        resp = view.delete(request, 1)

        self.assertEquals(resp.status_code, 204)
        self.assertRaises(Expense.DoesNotExist)