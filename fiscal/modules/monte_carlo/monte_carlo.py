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
- flexible date/time
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
        self.__iterations = 200
        self.__sim_results = None
        self.__historical_returns = None
        self.__prices = None
        self.__start_date = dt.datetime(start_year,1,1)
        self.__end_date = dt.datetime((end_year-1),12,31)
        self.__total_years = end_year - start_year
        self.__asset_names = asset_names


    def run_sim(self):
        """
        Run the Monte_carlo simulation for the user
        """
        
        self.__get_historical_data()

        trading_days = 252 * self.__total_years
        self.__sim_results = pd.DataFrame()
        last_price = self.__prices[-1]

        #sim loop
        for x in range(self.__iterations):
            count = 0
            daily_vol = self.__historical_returns.std()

            price_series = []
            price = last_price*(1+np.random.normal(0, daily_vol))
            price_series.append(price)

            for i in range(trading_days):
                if count == trading_days - 1:
                    break
                price = price_series[count]*(1+np.random.normal(0, daily_vol))
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

        # get prices of first stock element from yahoo
        self.__prices = web.DataReader(self.__asset_names[0], 'yahoo', self.__start_date, self.__end_date)['Adj Close']

        self.__historical_returns = self.__prices.pct_change()



if __name__ == "__main__":
    monte = Monte_carlo(2019, 2020, ["AAPL"])
    monte.run_sim()
    print(monte.get_results())