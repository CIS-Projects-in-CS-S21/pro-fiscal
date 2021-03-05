from rest_framework.views import APIView

class DebtList(APIView):
    """
    List all debts, or add a new one
    """

    def get(self, request):
        """
        Get the list of debts

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: list of debts in JSON format
        """
        pass

    def post(self, request):
        """
        Add a new debt

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass

class DebtDetail(APIView):
    """
    Get, update, or delete an individual debt
    """

    def get(self, request, key):
        """
        Get the specified debt

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the debt

        Returns:
            Response: JSON formatted data
        """
        pass

    def put(self, request, key):
        """
        Update the specified debt

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the debt

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass

    def delete(self, request, key):
        """
        Delete the specified debt

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the debt

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass