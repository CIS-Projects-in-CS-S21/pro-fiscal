from django.test import TestCase, Client

class AccountManagementTest(TestCase):

    def setup(self):
        self.client = Client()

    def test_Register_Invalid_Request(self):
        resp = self.client.get('/rest-auth/registration/', format='json')
        self.assertEqual(resp.status_code, 405, "GET request not valid for registration")

    def test_Register_Failed_Attempt(self):
        data = {
                "username": "",
                "email": "",
                "password1": "",
                "password2": ""
                }
        resp = self.client.post('/rest-auth/registration/', data)
        self.assertEqual(resp.status_code, 400, "Improper data for registration")

    def test_Register_Success(self):
        data = {
                "username": "bob",
                "email": "bob@example.com",
                "password1": "0C9uasR^K#tt^SxS",
                "password2": "0C9uasR^K#tt^SxS"
                }
        resp = self.client.post('/rest-auth/registration/', data)
        self.assertEqual(resp.status_code, 201, "Proper data for registration")


