from rest_framework import serializers
# from planning_tool.models import Portfolio, Holding

class PortfolioSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize Portfolio instances
    """

    class Meta:
        """
        Attributes:
            model (__class__): The Portfolio model class
            fields (list): A list of the fields in the Portfolio model
        """
        pass

class HoldingSerializer(serializers.ModelSerializer):
    """
    A class to serialize and deserialize Holding instances
    """

    class Meta:
        """
        Attributes:
            model (__class__): The Holding model class
            fields (list): A list of the fields in the Holding model
        """
        pass
