class Cluster:
    """
    Holds the pickled cluster analysis model and assigns
        users to their appropriate risk cluster

    Attributes:
        batch (numPy.array): a numpy array holding the data of users to
            be processed

    """

    def __init__(self):
        """
        Initializes the Cluster object
        """
        pass
    
    def run_analysis(self, dict):
        """
        Runs the cluster analysis on all the passed user data

        Arguments:
            dict (dictionary): A dictionary consisting of the user (key) 
                and their questionaire results (value)

        Returns:
            list: A list of the results of the cluster analysis
        """
        pass