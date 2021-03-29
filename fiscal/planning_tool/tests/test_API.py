from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from planning_tool.models import *


class PlanningToolAPITest(TestCase):
    """
    A class to test the integration of different components in the Planning Tool API
    """

    @classmethod
    def setUpTestData(cls):
        cls.acct_type = Account_Type(type='IRA')
        cls.acct_type.save()

        cls.sec_type = Security_Type(type='Bond')
        cls.sec_type.save()

        cls.user = User.objects.create_user(username="Test", password="fiscaltest", email="test@test.com")

        cls.port_1 = Portfolio(user=cls.user, account_type=cls.acct_type, name="My IRA", balance=100.00)
        cls.port_1.save()

        cls.hold_1 = Holding(portfolio=cls.port_1, security_type=cls.sec_type, ticker="GOOG",
                             price=1000.00, shares=2, purchase_date="2020-12-30", cost_basis=750.00)
        cls.hold_1.save()

    def setUp(self):
        self.client = APIClient()
        self.client.login(username="Test", password="fiscaltest")

    def test_get_portfolios_no_login(self):
        self.client.logout()
        resp = self.client.get('/planning/portfolio/', format='json')
        self.assertEquals(resp.status_code, status.HTTP_401_UNAUTHORIZED, "User should not be able to access API unless logged in")

    def test_get_portfolios_logged_in(self):
        resp = self.client.get('/planning/portfolio/')
        self.assertEquals(resp.status_code, status.HTTP_200_OK)
        self.assertTrue(isinstance(resp.data, list))

    def test_new_portfolio_success(self):
        data = {
            'account_type': "IRA",
            "name": "New IRA",
            "balance": 200.00,
            "description": "A useful description"
        }
        resp = self.client.post('/planning/portfolio/', data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_201_CREATED, resp.data)

    def test_new_portfolio_failure(self):
        data = {
            'account_type': "IRA",
            "name": "My IRA",
            "description": "A useful description"
        }
        resp = self.client.post('/planning/portfolio/', data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_400_BAD_REQUEST, resp.data)
        self.assertTrue(resp.data["balance"], "There should be an error message for balance")

    def test_update_portfolio_success(self):
        data = {
            'account_type': "IRA",
            "name": "My IRA",
            "balance": 400.00,
            "description": "A useful description"
        }

        resp = self.client.put('/planning/portfolio/1', data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_200_OK, resp.data)

    def test_update_portfolio_success(self):
        data = {
            'account_type': "IRA",
            "name": "My IRA",
            "description": "A useful description"
        }

        resp = self.client.put('/planning/portfolio/1', data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_400_BAD_REQUEST, resp.data)
        self.assertTrue(resp.data["balance"], "There should be an error message for balance")