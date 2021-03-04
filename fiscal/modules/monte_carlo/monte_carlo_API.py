from rest_framework.views import APIView

class Monte_carlo_API(APIView):
    """
    Facilitates data transfer from the Monte_carlo class

    Attributes:
        sim (Monte_carlo): The monte_carlo simulation object
        request_data (dictionary {string: numPy.array}): A dictionary consisting
            of the users' names (key) and the results of their monte_carlo 
            simulation (value)
    """

    def __init__(self):
        """
        Initializes the Monte_carlo_API object
        """
        pass
    
    def get(self, request, key):
        """
         Gets the results of the monte_carlo simulation

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            key (string): The name of the user who's monte_carlo sim results
                are to be fetched

        Returns:
            Response: results of the monte_carlo simulation in JSON format
        """
        pass

    def __aggregate_data(self, request_data, key):
        """
        Combines the request data and stores it in the corresponding key

        Arguments:
            request_data (list): A list holding the request data to be combined
            key (string): The name of the user to store the combined request data
                under
        
        Returns:
            dict: A dictionary container the key value pair of the aggregated data
        """
        pass