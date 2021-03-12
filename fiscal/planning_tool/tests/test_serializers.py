from django.test import TestCase
from planning_tool.serializers import *


class SerializerTest(TestCase):

    def setUp(self):
        self.acct_type = Account_Type(type='IRA')
        self.acct_type.save()
        self.sec_type = Security_Type(type="Stock")
        self.sec_type.save()

        self.user_attr = {
            'username': 'Test',
            'password': 'fiscaltest'
        }

        self.user = User.objects.create(**self.user_attr)

        self.acct_attr = {
            'id': None,
            'user': self.user,
            'account_type': self.acct_type,
            'name': "MyTestAccount",
            'description': "Just a Test",
            'balance': 100.00,
        }

        self.acct = Portfolio.objects.create(**self.acct_attr)

        self.holding_attr = {
            'id': None,
            'portfolio': self.acct,
            'security_type': self.sec_type,
            'ticker': "GOOG",
            'price': 1000.00,
            'shares': 20,
            'cost_basis': None,
            'purchase_date': None
        }

        self.holding = Holding.objects.create(**self.holding_attr)

        self.user_serializer = UserSerializer(instance=self.user)
        self.port_serializer = PortfolioSerializer(instance=self.acct)
        self.holding_serializer = HoldingSerializer(instance=self.holding)

    def test_portfolio_validity(self):
        data = {
            'user': 1,
            'account_type': None,
            "name": "My 401k",
            "balance": 200.00,
            "holdings": [1]
        }
        serializer = PortfolioSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_portfolio_create(self):
        data = {
            'user': 1,
            'account_type': None,
            "name": "My 401k",
            "balance": 200.00,
            "holdings": []
        }
        serializer = PortfolioSerializer(data=data)
        serializer.is_valid()
        self.assertTrue(serializer.save(), serializer.errors)

    def test_portfolio_update(self):
        data = {
            'user': 1,
            'account_type': None,
            "name": "My 401k",
            "balance": 200.00,
            "holdings": []
        }
        existing_portfolio = Portfolio.objects.first()
        serializer = PortfolioSerializer(existing_portfolio, data=data)
        serializer.is_valid()
        self.assertTrue(serializer.save(), serializer.errors)

    def test_portfolio_contains_expected_fields(self):
        data = self.port_serializer.data
        self.assertEqual((set(data.keys())),
                         set(self.acct_attr.keys()).union(['holdings']), "Portfolio contained unexpected fields")

    def test_holding_validity(self):
        data = {
            'portfolio': 1,
            'security_type': None,
            'ticker': 'GNMA',
            'price': 1000.00,
            'shares': 1.5
        }

        serializer = HoldingSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_holding_create(self):
        data = {
            'portfolio': 1,
            'security_type': None,
            'ticker': 'GNMA',
            'price': 1000.00,
            'shares': 1.5
        }
        serializer = HoldingSerializer(data=data)
        serializer.is_valid()
        self.assertTrue(serializer.save(), serializer.errors)

    def test_holding_update(self):
        data = {
            'portfolio': 1,
            'security_type': None,
            'ticker': 'GNMA',
            'price': 1000.00,
            'shares': 1.5
        }
        existing_holding = Holding.objects.first()
        serializer = HoldingSerializer(existing_holding, data=data)
        serializer.is_valid()
        self.assertTrue(serializer.save(), serializer.errors)

    def test_holding_contains_expected_fields(self):
        data = self.holding_serializer.data
        self.assertEqual((set(data.keys())),
                         set(self.holding_attr.keys()), "Holding contained unexpected fields")

    def test_user_contains_expected_fields(self):
        data = self.user_serializer.data
        self.assertEqual((set(data.keys())),
                         set(['id', 'username', 'portfolio_accounts']), "User contained unexpected fields")