from rest_framework.views import APIView

class PortfolioList(APIView):
    """
    List all accounts, or add a new one
    """

    def get(self, request):
        """
        Get the list of accounts

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: list of account in JSON format
        """
        pass

    def post(self, request):
        """
        Add a new account

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass

class PortfolioDetail(APIView):
    """
    Get, update, or delete an individual portfolio account
    """

    def get(self, request, key):
        """
        Get the specified portfolio account

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data
        """
        pass

    def put(self, request, key):
        """
        Update the specified portfolio account

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass

    def delete(self, request, key):
        """
        Delete the specified portfolio account

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the portfolio account

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass