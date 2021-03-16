from django.test import TestCase
from rest_framework.test import APIRequestFactory
from planning_tool.views import *
from planning_tool.serializers import *

import datetime

from planning_tool.views import PortfolioList


class ListViewTest(TestCase):

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
            'account_type': "IRA",
            "name": "My IRA",
            "balance": 200.00,
            "description": "A useful description",
            "holdings": []
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

    def test_post_portfolioList_success(self):
        request = self.factory.post("portfolio/", data=self.success_data, format="json")
        request.user = self.user
        request.data = self.success_data

        view = PortfolioList()
        view.setup(request)
        resp = view.post(request)

        self.assertEquals(resp.status_code, 201)

    def test_post_portfolioList_fail(self):
        data = {
            "user": None,
            "name": "This Will Not Work",
            "balance": 0.00
        }
        request = self.factory.post("portfolio/", data=data, format="json")
        request.user = self.user
        request.data = data

        view = PortfolioList()
        view.setup(request)
        resp = view.post(request)

        self.asserEquals(resp.status_code, 400)

    def test_dummy(self):
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
            "purchase_date": "2021-12-20"
        }
        hold = Holding.objects.create(**new_hold)

        data = {
            "user": self.user,
            "name": "This Will Not Work",
            "balance": 0.00
        }
        request = self.factory.get("portfolio/", data=data, format="json")
        request.user = self.user
        request.data = data

        view = PortfolioList()
        view.setup(request)
        resp = view.get(request)

        print(resp.data)

        self.asserEquals(resp.status_code, 400)

class DetailViewTest(TestCase):

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
            'account_type': "IRA",
            "name": "My IRA",
            "balance": 200.00,
            "description": "A useful description",
            "holdings": []
        }

        self.port_1 = Portfolio(user=self.user, account_type=self.acct_type, name="My IRA", balance=100.00)
        self.port_1.save()

        self.expected_data = {
            "portfolio_id": 2,
            "user_id": 1,
            "username": "Test",
            "name": "Test data",
            "balance": 100.00,
            "account_type": "IRA",
            "description": "This is how the data should look",
            "holdings": [
                {"holding_id": 1,
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

    def test_get_portfolioDetail_expected_format(self):
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
            "purchase_date": datetime.datetime(2020, 12, 20)
        }
        hold = Holding.objects.create(**new_hold)

        # Get response and test against expected values
        request = self.factory.get("portfolio/2")
        request.user = self.user

        view = PortfolioList()
        view.setup(request)
        resp = view.get(request, 2)

        ret_holdings = resp.data.pop("holdings")[0]
        expected_holdings = self.expected_data.pop("holdings")

        self.assertEquals(resp.status_code, 200)
        for field in self.expected_data.keys():
            self.assertEquals(resp.data[field], self.expected_data[field], f"Unexpected value in portfolio for {field}")
        for field in expected_holdings.keys():
            self.assertEquals(ret_holdings[field], expected_holdings[field], f"Unexpected value in holding for {field}")

    def test_put_portFolioDetail(self):
        data = {
            'user': 1,
            'account_type': "IRA",
            "name": "My IRA",
            "balance": 200.00,
            "description": "A useful description",
            "holdings": []

        }
        request = self.factory.put("portfolio/1")
        request.user = self.user
        request.data = data

        view = PortfolioDetail()
        view.setup(request)
        resp = view.get(request, 1)

        self.assertEquals(resp.status_code, 200)

    def test_delete_portFolioDetail(self):
        request = self.factory.delete("portfolio/1")
        request.user = self.user

        view = PortfolioDetail()
        view.setup(request)
        resp = view.delete(request, 1)

        self.assertEquals(resp.status_code, 200)