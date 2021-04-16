from django.test import TestCase, Client
from planning_tool.serializers import *


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