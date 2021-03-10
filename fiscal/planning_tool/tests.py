from django.test import TestCase
from planning_tool.models import *
from planning_tool.serializers import *

class SerializerTest(TestCase):

    def setUp(self):
        self.user = User(username="Test", password="fiscaltest")
        self.user.save()
        self.acct_type = Account_Type(type='IRA')
        self.acct_type.save()
        self.sec_type = Security_Type(type="Stock")
        self.sec_type.save()

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

        self.port_serializer = PortfolioSerializer(instance=self.acct)
        self.holding_serializer = HoldingSerializer(instance=self.holding)

    def test_portfolio_contains_expected_fields(self):
        data = self.port_serializer.data

        self.assertEqual((set(data.keys())), set(self.acct_attr.keys()).union(['holdings']))

    def test_holding_contains_expected_fields(self):
        data = self.holding_serializer.data

        self.assertEqual((set(data.keys())), set(self.holding_attr.keys()))