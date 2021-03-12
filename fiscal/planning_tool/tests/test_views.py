from django.test import TestCase
from rest_framework.test import APIRequestFactory
from planning_tool.views import *
from planning_tool.serializers import *

import datetime

class ViewTest(TestCase):

    def setUp(self):
        self.acct_type = Account_Type(type='IRA')
        self.acct_type.save()

        self.sec_type = Security_Type(type='Bond')
        self.sec_type.save()

        self.user = User(username="Test", password="fiscaltest")
        self.user.save()

        self.factory = APIRequestFactory()

        self.success_data = {
            'user': 1,
            'account_type': 1,
            "name": "My IRA",
            "balance": 200.00,
            "description": "Employer Contributions",
            "holdings": []
        }

        self.expected_data = {
            "id": 2,
            "user_id": 1,
            "username": "Test",
            "name": "Test data",
            "balance": 100.00,
            "account_type": "IRA",
            "description": "This is how the data should look",
            "holdings": [
                {"id": 1,
                 "portfolio_id": 2,
                 "security_type": "Bond",
                 "ticker": "GNMA",
                 "price": 50.0,
                 "shares": 2,
                 "cost_basis": 40.0,
                 "purchase_date": "12-20-2021"
                 }
            ]
        }

    def test_get_portfolioList_no_entries(self):
        request = self.factory.get("portfolio/")
        request.user = self.user

        view = PortfolioList()
        view.setup(request)
        resp = view.get(request)

        self.assertEquals(resp.status_code, 200)
        self.assertTrue(not resp.data, "Response data should be empty")

    def test_get_portfolioList_with_entries(self):
        port = PortfolioSerializer(data=self.success_data)
        port.is_valid()
        port.save()

        request = self.factory.get("portfolio/")
        request.user = self.user

        view = PortfolioList()
        view.setup(request)
        resp = view.get(request)

        self.assertEquals(resp.status_code, 200)
        self.assertTrue(resp.data, "Response data should not be empty")

    def test_get_portfolioList_expected_format(self):
        """
        Verify that a get call to the view returns data with the correct keys and expected formats
        """

        # Add the data to the test DB
        new_port = {
            "user": self.user,
            "name": "Test data",
            "balance": 100.00,
            "account_type": self.acct_type,
            "description": "This is how the returned data should look"
        }
        port = Portfolio.objects.create(**new_port)

        new_hold = {
            "portfolio": port,
            "security_type": self.sec_type,
            "ticker": "GNMA",
            "price": 50.0,
            "shares": 2,
            "cost_basis": 40.0,
            "purchase_date": datetime(2020, 12, 20)
        }
        hold = Portfolio.objects.create(**new_hold)

        # Get response and test against expected values
        request = self.factory.get("portfolio/")
        request.user = self.user

        view = PortfolioList()
        view.setup(request)
        resp = view.get(request)

        ret_holdings = resp.data.pop("holdings")
        expected_holdings = self.expected_data.pop("holdings")

        self.assertEquals(resp.status_code, 200)
        for field in self.expected_data.keys():
            self.assertEquals(resp.data[field], self.expected_data[field], f"Unexpected value in portfolio for {field}")
        for field in expected_holdings.keys():
            self.assertEquals(ret_holdings[field], expected_holdings[field], f"Unexpected value in holding for {field}")


    def test_post_portfolioList(self):
        request = self.factory.post("portfolio/", data=self.success_data, format="json")
        request.user = self.user
        request.data = self.success_data

        view = PortfolioList()
        view.setup(request)
        resp = view.post(request)

        self.assertEquals(resp.status_code, 201)