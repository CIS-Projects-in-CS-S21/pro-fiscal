import pandas_datareader.data as web
import pandas as pd
import numpy as np
import datetime as dt
import matplotlib.pyplot as plt
from matplotlib import style

"""
TODO:
- Update comments
- finish methods
- fix output
- add multiple tickers
- switch to yearly average
- 10k iterations
- normalize weight by percentage of portfolio
"""

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
    
    def __init__(self, start_year, end_year, asset_names):
        """
        Initializes the Monte_carlo object
        """
        self.__iterations = 100
        self.__sim_results = None
        self.__historical_returns = None
        self.__prices = None
        self.__last_price = None
        self.__start_year = start_year
        self.__end_year = end_year
        self.__total_years = self.__end_year - self.__start_year + 1
        self.__asset_names = asset_names


    def run_sim(self):
        """
        Run the Monte_carlo simulation for the user
        """
        
        self.__get_historical_data()

        self.__sim_results = pd.DataFrame()


        #sim loop
        for x in range(self.__iterations):
            count = 0
            yearly_vol = self.__historical_returns.std()

            price_series = []
            price = self.__last_price*(1+np.random.normal(0, yearly_vol))
            price_series.append(price)

            for i in range(self.__total_years):
                if count == self.__total_years - 1:
                    break
                price = price_series[count]*(1+np.random.normal(0, yearly_vol))
                price_series.append(price)
                count +=1
            
            self.__sim_results[x] = price_series

    def get_results(self):
        """
        Fetches the results of the Monte_carlo simulation for the user

        Returns:
            list: A list of the results of the Monte_carlo simulation
        """
        return self.__sim_results

    def __get_historical_data(self):
        """
        Fetches the historical data of the user's assets

        Arguments:
            assets_names (list): A list of the user's assest names

        Returns:
            list: A list of the historical data for the passed asset names
        """

        start = self.__start_year

        years = []
        avgs = []

        for i in range(self.__total_years):
            prices = web.DataReader(self.__asset_names[0], 'yahoo', dt.datetime(start, 1, 1), dt.datetime(start, 12, 31))['Adj Close']
            years.append(start)
            avgs.append(np.average(prices))
            start += 1
            if (i == self.__total_years-1):
                self.__last_price = np.average(prices)

        # get prices of first stock element from yahoo
        self.__prices = pd.DataFrame(avgs, index=range(self.__total_years), columns=['Yearly avg'])

        self.__historical_returns = self.__prices.pct_change()

    def set_iterations(self, iterations):
        self.__iterations = iterations

    def set_start_year(self, start_year):
        self.__start_year = start_year
        self.__total_years = self.__end_year - self.__start_year

    def set_end_year(self, end_year):
        self.__end_year = end_year
        self.__total_years = self.__end_year - self.__start_year

if __name__ == "__main__":
    monte = Monte_carlo(2000, 2020, ["AAPL"])
    monte.run_sim()
    print(monte.get_results())