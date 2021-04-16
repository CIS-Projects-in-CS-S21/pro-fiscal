from django.test import TestCase
from rest_framework.test import APIClient
from utils.views import *

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