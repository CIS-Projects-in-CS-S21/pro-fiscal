from django.shortcuts import render
from rest_framework.views import APIView


class User_Profile(APIView):
    """
    Get, update, create, or delete a user
    """

    def get(self, request, key):
        """
        Get the specified user

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the user

        Returns:
            Response: JSON formatted data
        """
        pass

    def put(self, request, key):
        """
        Update the specified user

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the user

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass

    def post(self, request):
        """
        Add a new user

        Args:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass

    def delete(self, request, key):
        """
        Delete the specified user

        Args:
            request (HttpRequest): The request object from an HTTP request
            key (int): The primary key of the user

        Returns:
            Response: JSON formatted data and HTTP status
        """
        pass


class Classifier_API(APIView):
    """
    Facilitates data transfer from the Classifier class

    Attributes:
        classifier (Classifier): The classifier algorithm object
        request_data (dictionary {string: string}): A dictionary of the expense form (key),
            and it's budget category (value)

    """

    def __init__(self):
        """
        Initializes the Classifier_API object
        """
        pass

    def get(self, request, key):
        """
        Gets the results of the classifier algorthm

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            key (string): The text entered into the expense form of the budgeting tool

        Returns:
            Response: results of the classifier in JSON format
        """
        pass

    def __update_category(self, key):
        """
        Updates the category of the classifier entry

        Arguments:
            key (string): The text entered into the expense form of the budgeting tool

        Returns:
            boolean: confirmation if the update to the category was successful
        """
        pass

class Cluster_API(APIView):
    """
    Facilitates data transfer from the Cluster class

    Attributes:
        cluster (Cluster): The cluster algorithm object
        request_data (dictionary {string: int}): A dictionary of the User's name (key),
            and their risk category (value)
    """

    def __init__(self):
        """
        Initializes the Cluster_API object
        """
        pass

    def get(self, request, key):
        """
        Gets the results of the cluster algorthm

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            key (string): The user's name

        Returns:
            Response: results of the classifier in JSON format
        """
        pass

    def __get_cluster_label(self, key):
        """
        Fetches the cluster label of the specific key

        Arguments:
            key (string): The name of the user who's label is to be fetched

        Returns:
            int: The cluster label of the user
        """
        pass

    def __update_cluster_labels(self, keys):
        """
        Updates the labels for all of the users in keys

        Arguments:
            keys (list): A list of all the users' names who's cluster labels
                will be updated
        """
        pass

    def __fetch_batch(self):
        """
        Gets the dictionary for the current cluster analysis batch

        Returns:
            dictionary {string: int}: The dictionary holding the current batch
                of users names (key) and their cluster analysis results (value)
        """
        pass

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