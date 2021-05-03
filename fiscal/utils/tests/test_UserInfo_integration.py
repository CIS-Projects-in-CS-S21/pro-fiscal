from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from utils.views import *

class UserInfoTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="Test", password="fiscaltest", email="test@test.com")
        cls.token = Token.objects.create(user=cls.user)

    def setUp(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_returns_correct_info(self):
        expected_keys = ["id", "username", "email", "date_joined"]
        resp = self.client.get('/user-info/', format='json')
        self.assertEquals(resp.status_code, status.HTTP_200_OK)
        for key in resp.data.keys():
            self.assertIn(key, expected_keys, f"Unexpected key found: {key}")

    def test_unauthorized_user(self):
        # invalidate the current credentials
        self.client.credentials()
        resp = self.client.get('/user-info/', format='json')
        self.assertEquals(resp.status_code, status.HTTP_401_UNAUTHORIZED)