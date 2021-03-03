from rest_framework.views import APIView

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