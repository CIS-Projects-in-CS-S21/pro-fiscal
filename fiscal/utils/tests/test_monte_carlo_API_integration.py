from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from utils.views import *

class MonteCarloIntegrationTest(TestCase):
    """
    A class for automated integration tests of the Monte Carlo API with mock HTTP requests
    """

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='Test', password='fiscaltest', email='fake@test.com')
        cls.token = Token.objects.create(user=cls.user)

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
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_unauthorized_user_no_access(self):
        self.client.credentials()
        resp = self.client.get('/monte-carlo/')
        self.assertEquals(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_no_results(self):
        resp = self.client.get('/monte-carlo/')
        self.assertEquals(resp.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_results(self):
        MonteResults.objects.create(user=self.user, results={"future_values": []}, running=False)
        resp = self.client.get('/monte-carlo/')
        self.assertEquals(resp.status_code, status.HTTP_200_OK)

    def test_get_results_in_progress(self):
        MonteResults.objects.create(user=self.user, results={"future_values": []}, running=True)
        resp = self.client.get('/monte-carlo/')
        self.assertEquals(resp.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(resp.data["detail"], "Simulation in progress")

    def test_initiate_simulation(self):
        resp = self.client.post('/monte-carlo/', data=self.data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_201_CREATED)

    def test_cannot_initiate_multiple_simulations(self):
        self.client.post('/monte-carlo/', data=self.data, format='json')
        resp = self.client.post('/monte-carlo/', data=self.data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(resp.data["detail"], "Simulation in progress")

    def test_invalid_simulation_parameters(self):
        data = {
            "end_year": 2023,
            "contribution": 20,
            "monthly_withdrawal": 5,
            "inflation": 0.02,
            "retirement_allocation": ""
        }
        resp = self.client.post('/monte-carlo/', data=data, format='json')
        self.assertEquals(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(resp.data["Errors"]["retire_year"], "retire_year is a required field")