import pandas_datareader.data as web
import pandas as pd
import numpy as np
import datetime as dt
import matplotlib.pyplot as plt
from matplotlib import style

"""
TODO:
- fix weight issue
- switch data fetch to entire timeframe
- 'vectorize' tickers (reduce 'for each ticker' loop)
- 1d return with combined values
    - 1d week of sim, 1d iteration, for entire portfolio combined

"""


class Portfolio_Sim:
    """
    Creates and runs the Monte_carlo simulation for the user

    Attributes:
        iterations (int): The number of times to run the simulation
        historical_returns (list): A list containing the numPy.array of
            the historical returns for the assests of the user
        sim_results (dictionary): An array of the results of the user's
            Monte_carlo simulation. Key:value is the stock ticker name
            and the monte-carlo sim results for the ticker as a numPy.array
        prices (list): A list of numPy.arrays of the historical weekly price
            for each ticker
        last_prices(list): A list of the last price for each assest
        start_year(int): The starting year for the historical data to fetch
        end_year(int): The ending year for the historical data to fetch
        total_years(int): The total years to run the sim
        asset_names(list): A list containing the name of each ticker
        shares_held(list): A list containing the number of shared held
            for each ticker
        weights(list): A list of the weights corresponding to each held
            asset

    """

    def __init__(self, retire_year, end_year, portfolio_allocation, portfolio_values, monthly_withdrawal, inflation, iterations=1000):
        """
        Initializes the Monte_carlo object

        Arguments
            retire_year (int): The year when retirement starts
            end_year (int): The final time state of the simulation
            portfolio_allocation (dict): Percentage weights of different portfolio categories
            portfolio_values (dict): Current value of different portfolio categories
            monthly_withdrawal (int): The amount withdrawn monthly from the portfolio
            inflation (float): An inflation assumption
            iterations (int): The number of iterations the simulation will run for
        """
        self.__iterations = iterations
        self.__sim_results = {}
        self.__last_prices = []
        self.__start = dt.date.today()
        self.__retire_ = dt.date(retire_year, 1, 1)
        self.__end = dt.date(end_year, 12, 31)
        self.__total_years = end_year - self.__start.year
        self.__portfolio_allocation = portfolio_allocation
        self.__portfolio_values = portfolio_values
        self.__inflation = inflation
        self.__monthly_withdrawal = monthly_withdrawal
        self.__index_trackers = {"Stocks": "^GSPC", "Bonds": "AGG"}
        self.__stats = self.__get_historical_data()

    def run_sim(self):
        """
        Run the Monte_carlo simulation for the user
        """

        rng = pd.date_range(start=self.__start, end=self.__end, freq='W')

        values = pd.Series(self.__portfolio_values, dtype='Float64')
        allocations = pd.Series(self.__portfolio_allocation, dtype='Float64')

        portfolio_net = np.zeros(len(rng), np.int64)
        for j, date in enumerate(rng):
            for k in range(len(self.__stats)):
                portfolio_net[j] += values[k] * (1 + np.random.normal(self.__stats["mean"][k], self.__stats["std"][k]))
                # portfolio_net[j] += (values[k] / allocations[k])
        self.__sim_results = {"portfolio_values": list(portfolio_net)}


    def get_results(self):
        """
        Fetches the results of the Monte_carlo simulation for the user

        Returns:
            dictionary: A dictionary of the results of the Monte_carlo simulation
                key:value = "ticker name":numpyArr of sim results
        """
        return self.__sim_results

    def __get_historical_data(self):
        """
        Fetches the historical data of the user's assets
        """

        histDf = pd.DataFrame()
        for key,value in self.__index_trackers.items():
            prices = web.DataReader(value, 'yahoo', dt.date.today() - dt.timedelta(days=20*365),
                                    dt.date.today())['Adj Close']
            histDf[key] = pd.Series(prices)

        # print(histDf)
        # Resample the price series to be weekly
        histDf = histDf.resample('W', label='left').first()
        # print(histDf)
        historical_returns = histDf.pct_change(fill_method='ffill')
        # print(historical_returns)
        # find volatility
        stats = pd.DataFrame()
        stats["mean"] = historical_returns.mean()
        stats["std"] = historical_returns.std()
        return stats

    def set_iterations(self, iterations):
        # setter for iterations
        self.__iterations = iterations

    def set_start_year(self, start_year):
        # setter for start year, updates total years
        self.__start_year = start_year
        self.__total_years = self.__end_year - self.__start_year

    def set_end_year(self, end_year):
        # setter for end year, updates total years
        self.__end_year = end_year
        self.__total_years = self.__end_year - self.__start_year


if __name__ == "__main__":
    # function to test if the class works if run as main
    monte = Portfolio_Sim(2022, 2030, {"Stocks": 0.6, "Bond": 0.4}, {"Stocks": 600, "Bonds": 400}, None, 0.02)
    monte.run_sim()
    results = monte.get_results()
    print(results["portfolio_values"][-1])