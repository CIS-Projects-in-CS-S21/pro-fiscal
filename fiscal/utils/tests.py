from django.test import TestCase, Client
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, APIClient
from utils.views import *
from planning_tool.serializers import *
from time import sleep


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
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='Test', password='fiscaltest', email='fake@test.com')
        cls.user2 = User.objects.create_user(username='Test2', password='fiscaltest', email='fake@test.com')

        cls.sec1 = Security_Type.objects.create(type="Equities")
        cls.sec2 = Security_Type.objects.create(type="Fixed Income Securities")
        cls.acc = Account_Type.objects.create(type="IRA")

        port_data = {
            'user': cls.user,
            'account_type': cls.acc,
            "name": "My IRA",
            "balance": 200.00,
            "description": "A useful description",
        }
        cls.port = Portfolio.objects.create(**port_data)

        hold_data_1 = {
            "portfolio_id": cls.port.id,
            "security_type": cls.sec1,
            "ticker": "AAPL",
            "price": 100.0,
            "shares": 6,
            "cost_basis": 40.0,
            "purchase_date": "2020-12-20"
        }
        Holding.objects.create(**hold_data_1)

        hold_data_2 = {
            "portfolio_id": cls.port.id,
            "security_type": cls.sec2,
            "ticker": "GNMA",
            "price": 100,
            "shares": 4,
            "cost_basis": 40.0,
            "purchase_date": "2020-12-20"
        }
        Holding.objects.create(**hold_data_2)

        cls.data = {"retire_year": 2022,
                "end_year": 2023,
                "contribution": 20,
                "monthly_withdrawal": 5,
                "inflation": 0.02,
                "retirement_allocation": ""
                }
        
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_get_no_results(self):
        request = self.factory.get("monte-carlo/")
        request.user = self.user
        request.data = self.data

        view = Monte_carlo_API()
        view.setup(request)
        resp = view.get(request)

        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT,
                         "Request from user with no results should return 204")

    def test_get_results(self):
        MonteResults.objects.create(user=self.user2, results={"future_values": []}, running=False)
        request = self.factory.get("monte-carlo/")
        request.user = self.user2
        request.data = self.data

        view = Monte_carlo_API()
        view.setup(request)
        resp = view.get(request)

        self.assertEqual(resp.status_code, status.HTTP_200_OK, "Request from user with results should return 200")

    def test_bad_initiate_request(self):
        data = {}

        request = self.factory.post("monte-carlo/")
        request.user = self.user
        request.data = data

        view = Monte_carlo_API()
        view.setup(request)
        resp = view.post(request)
        # print(resp.data)

        self.assertEqual(resp.status_code, 400, "Request with the wrong data should return 400")

    def test_initiate_simulation(self):
        request = self.factory.post("monte-carlo/")
        request.user = self.user
        request.data = self.data

        view = Monte_carlo_API()
        view.setup(request)
        resp = view.post(request)
        # print(resp.data)

        self.assertEqual(resp.status_code, 201, "Request to initiate should return 201")
        self.assertEqual(resp.data["detail"], "Simulation Initiated")

    def test_sim_already_running(self):
        request = self.factory.post("monte-carlo/")
        request.user = self.user
        request.data = self.data

        view = Monte_carlo_API()
        view.setup(request)
        resp = view.post(request)

        request2 = self.factory.post("monte-carlo/")
        request2.user = self.user
        request2.data = self.data

        view2 = Monte_carlo_API()
        view2.setup(request)
        resp2 = view2.post(request)

        self.assertEqual(resp2.status_code, 202, "Simulation already initiated should return 202")
        self.assertEqual(resp2.data["detail"], "Simulation in progress")

    def test_get_results_sim_running(self):
        MonteResults.objects.create(user=self.user2, results={"future_values": []}, running=True)
        request = self.factory.get("monte-carlo/")
        request.user = self.user2
        request.data = self.data

        view = Monte_carlo_API()
        view.setup(request)
        resp = view.get(request)

        self.assertEqual(resp.status_code, status.HTTP_202_ACCEPTED,
                         "Request from user with running simulation should return 202")
        self.assertEqual(resp.data["detail"], "Simulation in progress")

class UserInfoTest(TestCase):
    def setUp(self):
        User.objects.create_user(username="Test", password="fiscaltest", email="test@test.com")

        self.client = APIClient()
        self.client.login(username="Test", password="fiscaltest")

    def test_returns_correct_info(self):
        expected_keys = ["id", "username", "email", "date_joined"]
        resp = self.client.get('/user-info/', format='json')
        self.assertEquals(resp.status_code, status.HTTP_200_OK)
        for key in resp.data.keys():
            self.assertIn(key, expected_keys, f"Unexpected key found: {key}")

    def test_unauthorized_user(self):
        self.client.logout()
        resp = self.client.get('/user-info/', format='json')
        self.assertEquals(resp.status_code, status.HTTP_401_UNAUTHORIZED)