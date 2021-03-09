class Classifier:
    """
    Holds the pickled classifier model and classifies expendenture entries
    
    Attributes:
        pickled_model_name (string): The name of the pickled classifier model
        model (classifier_model): The pickled classifier model saved from the external
            jupyter-notebook
    """
    
    def __init__(self):
        """
        Initializes the Classifier object
        """
        pass
    
    def classify(self, dict):
        """
        Determines a category for the passed expenditure string

        Arguments:
            dict (dictionary): A dictionary consisting of the entered expenditure strings
                (key) and their classification (value), if the expenditure already has a 
                classification
        
        Returns:
            string: The name of the class that the expenditure was placed into
        """
        pass