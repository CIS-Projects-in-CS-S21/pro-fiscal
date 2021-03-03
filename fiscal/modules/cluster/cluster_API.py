from rest_framework.views import APIView

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