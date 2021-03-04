from rest_framework import serializers
# from debt_tool.models import Debt

class DebtSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize Debt instances
    """

    class Meta:
        """
        Attributes:
            model (__class__): The Debt model class
            fields (list): A list of the fields in the Debt model
        """
        pass
