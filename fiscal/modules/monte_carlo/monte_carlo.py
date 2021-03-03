class Monte_carlo:
    """
    Creates and runs the Monte_carlo simulation for the user

    Attributes:
        iterations (int): The number of times to run the simulation
        historical_returns (numPy.array): An array of the historical data
            for the assests of the user
        simResults (numPy.array): An array of the results of the user's
            Monte_carlo simulation
        expect_returns (numPy.array): An array of the expected returns
            of the user's assets
        volatility (numPy.array): An array of the standard deviation
            (volatility) of the user's assets
    """
    
    def __init__(self):
        """
        Initializes the Monte_carlo object
        """
        pass

    def run_sim(self):
        """
        Run the Monte_carlo simulation for the user
        """
        pass

    def get_results(self):
        """
        Fetches the results of the Monte_carlo simulation for the user

        Returns:
            list: A list of the results of the Monte_carlo simulation
        """
        pass

    def __get_historical_data(self, list):
        """
        Fetches the historical data of the user's assets

        Arguments:
            list (list): A list of the user's assest names

        Returns:
            list: A list of the historical data for the passed asset names
        """
        pass