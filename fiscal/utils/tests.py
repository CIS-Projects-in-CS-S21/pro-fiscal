from django.test import TestCase, Client
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from utils.views import Monte_carlo_API
from planning_tool.models import Portfolio, Holding


class AccountManagementTest(TestCase):

    """
    A class for testing the integration of django-rest-auth API endpoints
    """

    def setup(self):
        self.client = Client()

    def test_Register_Invalid_Request(self):
        resp = self.client.get('/rest-auth/registration/', format='json')
        self.assertEqual(resp.status_code, 405, "GET request not valid for registration")


    def test_Register_Failed_Attempt(self):
        fail_data = {
            "username": "",
            "email": "",
            "password1": "",
            "password2": ""
        }
        resp = self.client.post('/rest-auth/registration/', fail_data)
        self.assertEqual(resp.status_code, 400, "Improper data for registration")

    def test_Register_Success(self):
        success_data = {
            "username": "bob",
            "email": "bob@example.com",
            "password1": "bobspassword",
            "password2": "bobspassword"
        }
        resp = self.client.post('/rest-auth/registration/', success_data)
        self.assertEqual(resp.status_code, 201, "Proper data for registration")

    def test_Login_Invalid_Request(self):
        resp = self.client.get('/rest-auth/login/', format='json')
        self.assertEqual(resp.status_code, 405, "GET request not valid for login")

    def test_Login_Failed_Attempt(self):
        fail_data = {
            "username": "",
            "email": "",
            "password": ""
        }
        resp = self.client.post('/rest-auth/login/', fail_data)
        self.assertEqual(resp.status_code, 400, "Improper data for login")

    def test_Login_Success(self):
        User.objects.create_user(username="logintest", password="logintest")
        success_data = {
            "username": "logintest",
            "password": "logintest"
        }
        resp = self.client.post('/rest-auth/login/', success_data)
        self.assertEqual(resp.status_code, 200, "Proper data for login")

    def test_Logout_Invalid_Request(self):
        resp = self.client.get('/rest-auth/logout/', format='json')
        self.assertEqual(resp.status_code, 405, "GET request not valid for logout")


    def test_Logout(self):
        data = {}
        resp = self.client.post('/rest-auth/logout/', data)
        self.assertEqual(resp.status_code, 200, "Should always logout")

class MonteCarloAPITest(TestCase):
    """
    Class for testing the Monte Carlo API
    """

    def setUp(self):
        self.user_attr = {
            'username': 'Test',
            'password': 'fiscaltest'
        }

        self.user = User.objects.create(**self.user_attr)

        self.factory = APIRequestFactory()

    def test_Bad_Request(self):
        data = {}

        request = self.factory.get("monte-carlo/")
        request.user = self.user
        request.data = data

        view = Monte_carlo_API()
        view.setup(request)
        resp = view.get(request)

        self.assertEqual(resp.status_code, 400, "Request with the wrong data should return 400")

    def test_Successful_Request_No_Data(self):
        data = {
            "start": 2019,
            "end": 2020
        }

        request = self.factory.get("monte-carlo/")
        request.user = self.user
        request.data = data

        view = Monte_carlo_API()
        view.setup(request)
        resp = view.get(request)

        self.assertEqual(resp.status_code, 200, "Request with the right data should return 200")
        self.assertEqual(resp.data, {}, "User with no portfolios should not return data")

    # def test_Successful_Request_With_Data(self):
    #     port_data = {
    #         'user_id': 1,
    #         'account_type': "IRA",
    #         "name": "My IRA",
    #         "balance": 200.00,
    #         "description": "A useful description",
    #         "holdings": []
    #     }
    #     Portfolio.objects.create(**port_data)
    #
    #     hold_data = {
    #         "id": 1,
    #         "portfolio": 1,
    #         "security_type": "STOCK",
    #         "ticker": "AAPL",
    #         "price": 50.0,
    #         "shares": 2,
    #         "cost_basis": 40.0,
    #         "purchase_date": "2020-12-20"
    #     }
    #     Holding.objects.create(**hold_data)
    #
    #     data = {
    #         "start": 2019,
    #         "end": 2020
    #     }
    #
    #     request = self.factory.get("monte-carlo/")
    #     request.user = self.user
    #     request.data = data
    #
    #     view = Monte_carlo_API()
    #     view.setup(request)
    #     resp = view.get(request)
    #
    #     print(resp.data)
    #
    #     self.assertEqual(resp.status_code, 200, "Request with the right data should return 200")