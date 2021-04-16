import datetime

from django.test import TestCase
from rest_framework.test import APIRequestFactory

from budget_tool.views import *
from budget_tool.serializers import *
from budget_tool.models import *

class ListViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User(username="Test", password="fiscaltest")
        cls.user.save()

        cls.success_data = {
            "user": cls.user.id,
            "amount": 100.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

    def setUp(self):
        self.factory = APIRequestFactory()

    def test_get_expenseList_no_entries(self):
        request = self.factory.get("expense/")
        request.user = self.user

        view = ExpenseList()
        view.setup(request)
        resp = view.get(request)

        self.assertEquals(resp.status_code, 200)
        self.assertTrue(not resp.data, "Response data should be empty")

    def test_get_expenseList_with_entries(self):
        Expense.objects.create(user_id=self.user.id, amount=100.50, transaction_date="2021-03-30",
                               description="More Fi$cal merch", category="Essential")

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
            "amount": 0.00,

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

        self.assertEquals(resp.status_code, 200)

    def test_post_success(self):

        data = {
            "amount": 100.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Other"
        }
        request = self.factory.post("expense/", data=data, format="json")
        request.user = self.user
        request.data = data

        view = ExpenseList()
        view.setup(request)
        resp = view.post(request)

        self.assertEquals(resp.status_code, 201, resp.data)


class DetailViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User(username="Test", password="fiscaltest")
        cls.user.save()

        cls.exp_1 = Expense(user_id=cls.user.id, amount=250.00, transaction_date="2021-03-29", description="Fi$cal merch",
                             category="Essential")
        cls.exp_1.save()

        cls.success_data = {
            "user": cls.user.id,
            "amount": 100.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

        cls.expected_data = {
            "user": cls.user.id,
            "amount": 250.00,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

    def setUp(self):
        self.factory = APIRequestFactory()
        
    def test_get_success(self):
        request = self.factory.get("expense/" + str(self.exp_1.id))
        request.user = self.user

        view = ExpenseDetail()
        view.setup(request)

        resp = view.get(request, self.exp_1.id)

        self.assertEquals(resp.status_code, 200)

    def test_get_portfolioDetail_expected_format(self):
        """
        Verify that a get call to the view returns data with the correct keys and expected formats
        """

        # Get response and test against expected values
        request = self.factory.get("expense/" + str(self.exp_1.id))
        request.user = self.user

        view = ExpenseDetail()
        view.setup(request)
        resp = view.get(request, self.exp_1.id)

        self.assertEquals(resp.status_code, 200)
        for field in self.expected_data.keys():
            self.assertEquals(resp.data[field], self.expected_data[field], f"Unexpected value in portfolio for {field}")

    def test_put_portFolioDetail(self):
        data = {
            "amount": 600.50,
            "transaction_date": "2021-03-29",
            "description": "Fi$cal merch",
            "category": "Essential"
        }

        request = self.factory.put("expense/" + str(self.exp_1.id))
        request.user = self.user
        request.data = data

        view = ExpenseDetail()
        view.setup(request)
        resp = view.put(request, self.exp_1.id)

        self.assertEquals(resp.data["amount"], "600.50", msg="Data should be updated")
        self.assertEquals(resp.status_code, 200, msg=resp.data)

    def test_delete_portFolioDetail(self):
        request = self.factory.delete("expense/" + str(self.exp_1.id))
        request.user = self.user

        view = ExpenseDetail()
        view.setup(request)
        resp = view.delete(request, self.exp_1.id)

        self.assertEquals(resp.status_code, 204)
        with self.assertRaises(Expense.DoesNotExist):
            Expense.objects.get(id=self.exp_1.id)