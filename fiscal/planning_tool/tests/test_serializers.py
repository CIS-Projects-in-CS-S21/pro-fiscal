from django.test import TestCase
from planning_tool.serializers import *
import datetime

class SerializerTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.sample_date = datetime.date(2021, 3, 23)

        cls.acct_type = Account_Type(type='IRA')
        cls.acct_type.save()
        cls.sec_type = Security_Type(type="Stock")
        cls.sec_type.save()

        cls.user_attr = {
            'username': 'Test',
            'password': 'fiscaltest'
        }

        cls.user = User.objects.create(**cls.user_attr)

        cls.acct_attr = {
            'id': None,
            'user': cls.user,
            'account_type': cls.acct_type,
            'name': "MyTestAccount",
            'description': "Just a Test",
            'balance': 100.00,
            'date': None
        }

        cls.acct = Portfolio.objects.create(**cls.acct_attr)

        cls.holding_attr = {
            'id': None,
            'portfolio': cls.acct,
            'security_type': cls.sec_type,
            'ticker': "GOOG",
            'price': 1000.00,
            'shares': 20,
            'cost_basis': 800.00,
            'purchase_date': cls.sample_date
        }

        cls.sample_date = datetime.date(2021,3, 23)

        cls.holding = Holding.objects.create(**cls.holding_attr)

        cls.user_serializer = UserSerializer(instance=cls.user)
        cls.port_serializer = PortfolioSerializer(instance=cls.acct)
        cls.holding_serializer = HoldingSerializer(instance=cls.holding)


    def test_portfolio_validity(self):
        data = {
            'user': self.user.id,
            'account_type': None,
            "name": "My 401k",
            "balance": 200.00,
            "holdings": [1]
        }
        serializer = PortfolioSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_portfolio_create(self):
        data = {
            'user': self.user.id,
            'account_type': None,
            "name": "My 401k",
            "balance": 200.00,
            "holdings": []
        }
        serializer = PortfolioSerializer(data=data)

        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertTrue(serializer.save())

    def test_portfolio_update(self):
        data = {
            'user': self.user.id,
            'account_type': None,
            "name": "My 401k",
            "balance": 200.00,
            "holdings": []
        }
        existing_portfolio = Portfolio.objects.first()
        serializer = PortfolioSerializer(existing_portfolio, data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertTrue(serializer.save(), serializer.errors)

    def test_portfolio_contains_expected_fields(self):
        data = self.port_serializer.data
        self.assertEqual((set(data.keys())),
                         set(self.acct_attr.keys()).union(['holdings', 'balance_history']), "Portfolio contained unexpected fields")

    def test_holding_validity(self):
        data = {
            'portfolio': self.acct.id,
            'security_type': None,
            'ticker': 'GNMA',
            'price': 1000.00,
            'shares': 1.5,
            'purchase_date': self.sample_date
        }

        serializer = HoldingSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_holding_create(self):
        data = {
            'portfolio': self.acct.id,
            'security_type': None,
            'ticker': 'GNMA',
            'price': 1000.00,
            'shares': 1.5,
            'purchase_date': self.sample_date
        }
        serializer = HoldingSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertTrue(serializer.save(), serializer.errors)

    def test_holding_update(self):
        data = {
            'portfolio': self.acct.id,
            'security_type': None,
            'ticker': 'GNMA',
            'price': 1000.00,
            'shares': 1.5,
            'purchase_date': self.sample_date
        }
        existing_holding = Holding.objects.first()
        serializer = HoldingSerializer(existing_holding, data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertTrue(serializer.save(), serializer.errors)

    def test_holding_contains_expected_fields(self):
        data = self.holding_serializer.data
        self.assertEqual((set(data.keys())),
                         set(self.holding_attr.keys()), "Holding contained unexpected fields")

    def test_user_contains_expected_fields(self):
        data = self.user_serializer.data
        self.assertEqual((set(data.keys())),
                         set(['id', 'username', 'portfolio_accounts']), "User contained unexpected fields")