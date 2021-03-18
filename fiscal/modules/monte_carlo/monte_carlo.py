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
- maybe move to weekyl
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
    
    def __init__(self, start_year, end_year, asset_names, shares_held):
        """
        Initializes the Monte_carlo object
        """
        self.__iterations = 10000
        self.__sim_results = {}
        self.__historical_returns = []
        self.__prices = []
        self.__last_prices = []
        self.__start_year = start_year
        self.__end_year = end_year
        self.__total_years = self.__end_year - self.__start_year + 1
        self.__asset_names = asset_names
        self.__shares_held = shares_held
        self.__weights = self.__get_weights()
        self.__get_historical_data()

    def run_sim(self):
        """
        Run the Monte_carlo simulation for the user
        """

        for pos in range(len(self.__asset_names)):
            
            results = pd.DataFrame()

            #sim loop
            for x in range(self.__iterations):
                count = 0
                yearly_vol = self.__historical_returns[pos].std()
                price_series = []
                price = self.__last_prices[pos]*(1+np.random.normal(0, yearly_vol))
                price_series.append(price[0] * self.__shares_held[pos] * self.__weights[pos])

                for i in range(self.__total_years):
                    if count == self.__total_years - 1:
                        break
                    price = price_series[count]*(1+np.random.normal(0, yearly_vol))
                    price_series.append(price[0] * self.__shares_held[pos] * self.__weights[pos])
                    count +=1
                
                results[x] = price_series

            self.__sim_results[self.__asset_names[pos]] = results

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
        for entry in self.__asset_names:
            start = self.__start_year

            avgs = []

            for i in range(self.__total_years):
                prices = web.DataReader(self.__asset_names[0], 'yahoo', dt.datetime(start, 1, 1), dt.datetime(start, 12, 31))['Adj Close']
                avgs.append(np.average(prices))
                start += 1
                if (i == self.__total_years-1):
                    self.__last_prices.append(np.average(prices))

            # get prices of first stock element from yahoo
            pricesDf = pd.DataFrame(avgs, index=range(self.__total_years), columns=['Yearly avg'])

            self.__prices.append(pricesDf)

            self.__historical_returns.append(pricesDf.pct_change())

    def set_iterations(self, iterations):
        self.__iterations = iterations

    def set_start_year(self, start_year):
        self.__start_year = start_year
        self.__total_years = self.__end_year - self.__start_year

    def set_end_year(self, end_year):
        self.__end_year = end_year
        self.__total_years = self.__end_year - self.__start_year

    def __get_weights(self):
        total = sum(self.__shares_held)
        out = []
        for num in self.__shares_held:
            out.append(num/total)
        return out

if __name__ == "__main__":
    monte = Monte_carlo(2015, 2020, ["AAPL", "AMZN"], [200, 75])
    monte.run_sim()
    print(monte.get_results())