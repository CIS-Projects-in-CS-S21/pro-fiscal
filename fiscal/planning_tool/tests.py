from django.test import TestCase
from planning_tool.models import *
from planning_tool.serializers import *


class PortfolioSerializerTest(TestCase):

    def setUp(self):
        self.user = User(username="Test", password="fiscaltest")
        self.user.save()
        self.acct_type = Account_Type(type='IRA')
        self.acct_type.save()
        self.sec_type = Security_Type(type="Stock")
        self.sec_type.save()

        self.acct_attr = {
            'user': self.user,
            'account_type': self.acct_type,
            'name': "MyTestAccount",
            'description': "Just a Test",
            'balance': 100.00
        }

        self.acct = Portfolio.objects.create(**self.acct_attr)

        self.holding_attr = {
            'portfolio': self.acct,
            'security_type': self.sec_type,
            'ticker': "GOOG",
            'price': 1000.00,
            'shares': 20
        }

        self.holding = Holding.objects.create(**self.holding_attr)

        self.port_serializer = PortfolioSerializer(instance=self.acct)
        self.holding_serializer = HoldingSerializer(instance=self.holding)

    def test_contains_expected_fields(self):
        data = self.port_serializer.data

        self.assertEqual((set(data.keys())), set(self.acct_attr.keys()).union(['id', 'holdings']))

