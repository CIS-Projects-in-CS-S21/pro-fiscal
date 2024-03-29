import pandas_datareader.data as web
import pandas as pd
import numpy as np
import datetime as dt
import matplotlib.pyplot as plt
from matplotlib import style

class PortfolioSim:
    """
    Creates and runs the Monte_carlo simulation for the user

    Attributes:
        iterations (int): The number of times to run the simulation
        sim_results (list): The results of the user's
            Monte_carlo simulation.
        start (date): The current date, which is the starting date for the simulation
        retire (date): The date when the simulation switches to retirement
        end (date): The ending date for the simulation
        current_allocation (dict): Current allocation of investments in the portfolio where each key is the investment
            type and each value is the percentage weight.
        retirement_allocation (dict): The allocation of investments in the portfolio when the simulation switches to
            retirement where each key is the investment type and each value is the percentage weight.
        contribution (float): The amount contributed to the portfolio each month before retirement
        monthly_withdawal (float): The amount withdrawn monthly from the portfolio after retirement
        inflation (float): An inflation assumption
        iterations (int): The number of iterations the simulation will run for
        index_trackers (dict): The tickers to query for historical data
        stats (dataframe): Statistics about the historical data
    """

    def __init__(self, retire_year, end_year, portfolio_values,
                 contribution, monthly_withdrawal, inflation, current_allocation,
                 retirement_allocation=None, iterations=1000, history_length=20):
        """
        Initializes the Monte_carlo object

        Arguments
            retire_year (int): The year when retirement starts
            end_year (int): The final time state of the simulation
            current_allocation (dict): Percentage weights of different portfolio categories
            retirement_allocation (dict): Percentage weights of different portfolio categories after retirement
            portfolio_values (dict): Current value of different portfolio categories
            contribution (float): The amount contributed to the portfolio each month before retirement
            monthly_withdrawal (int): The amount withdrawn monthly from the portfolio after retirement
            inflation (float): An inflation assumption
            iterations (int): The number of iterations the simulation will run for
        """

        self.__start = dt.date.today()

        # check for invalid inputs
        assert retire_year >= self.__start.year, "'retire_year' may not be in the past"
        assert end_year > self.__start.year, "'end_year' may not be in the past"
        assert contribution >= 0, "'contribution' may not be negative"
        assert monthly_withdrawal >= 0, "'monthly_withdrawal' may not be negative"

        self.__iterations = iterations
        self.__sim_results = []

        self.__retire = dt.date(retire_year, 1, 1)
        self.__end = dt.date(end_year, 12, 31)
        self.__current_allocation = current_allocation
        if retirement_allocation is not None:
            self.__retirement_allocation = retirement_allocation
        else:
            self.__retirement_allocation = current_allocation
        self.__portfolio_values = portfolio_values
        self.__inflation = inflation
        self.__contribution = contribution
        self.__monthly_withdrawal = monthly_withdrawal
        self.__index_trackers = {"Stocks": "^GSPC", "Bonds": "AGG"}
        self.__history_length = history_length

        self.__stats = self.__get_historical_data()

    def run_sim(self):
        """
        Run the Monte_carlo simulation for the user and store the results in sim_results
        """
        if self.__end > self.__retire:
            before_retirement = len(pd.date_range(start=self.__start, end=self.__retire, freq='M'))
            after_retirement = len(pd.date_range(start=self.__retire, end=self.__end, freq='M'))
        else:
            before_retirement = len(pd.date_range(start=self.__start, end=self.__end, freq='M'))
            after_retirement = 0

        results = np.zeros(self.__iterations, dtype=np.float64)

        for i in range(self.__iterations):
            # Reset to initial values for the iteration
            values = pd.Series(self.__portfolio_values, dtype='Float64')
            allocations = pd.Series(self.__current_allocation, dtype='Float64')
            withdrawal = self.__monthly_withdrawal

            # Calculate values before retirement, accounting for monthly contributions
            for j in range(before_retirement):
                for k in range(len(self.__stats)):
                    # Geometric Brownian Motion: S_i+1 = S_i(mu*dt + sigma * normal * sqrt(dt) + S_i
                    values[k] += values[k] * (self.__stats["mean"][k] + np.random.normal(0, 1) * self.__stats["std"][k])

                    # add monthly contribution
                    values[k] += self.__contribution * allocations[k]

            allocations = pd.Series(self.__retirement_allocation)

            # Calculate values after retirement, accounting for monthly withdrawals
            for j in range(after_retirement):
                for k in range(len(self.__stats)):
                    # Geometric Brownian Motion: S_i+1 = S_i(mu*dt + sigma * normal * sqrt(dt) + S_i
                    values[k] += values[k] * (self.__stats["mean"][k] + np.random.normal(0, 1) * self.__stats["std"][k])

                    # TODO: This is a naive monthly withdrawal implementation that pulls from both stocks and bonds
                    values[k] -= self.__monthly_withdrawal * allocations[k]

                # increase monthly withdrawal by amortized inflation
                withdrawal += withdrawal * (self.__inflation / 12)

            results[i] = values.sum()

        # remove outliers
        std_dev = np.std(results)
        mean = np.mean(results)
        max_devs = 3
        no_outliers = results[abs(results) - mean < max_devs * std_dev]
        self.__sim_results = [round(float(x), 2) for x in no_outliers]

    def get_results(self):
        """
        Fetches the results of the Monte_carlo simulation for the user

        Returns:
            list: A list of final portfolio values for each iteration
        """
        return self.__sim_results

    def __get_historical_data(self):
        """
        Fetches the historical data of the user's assets

        Returns:
            Dataframe: Statistics about the fetched historical data including mean and standard deviation
        """

        histDf = pd.DataFrame()
        for key,value in self.__index_trackers.items():
            prices = web.DataReader(value, 'yahoo', dt.date.today() - dt.timedelta(days=self.__history_length*365),
                                    dt.date.today())['Adj Close']
            histDf[key] = pd.Series(prices)

        # Resample the price series to be monthly
        histDf = histDf.resample('M', label='left').first()
        historical_returns = histDf.pct_change(fill_method='ffill')
        # find volatility
        stats = pd.DataFrame()
        stats["mean"] = historical_returns.mean()
        stats["std"] = historical_returns.std()
        return stats

    def set_iterations(self, iterations):
        # setter for iterations
        self.__iterations = iterations

    def set_retirement_year(self, retire_year):
        # setter for start year, updates total years
        self.__retire = retire_year

    def set_end_year(self, end_year):
        # setter for end year, updates total years
        self.__end = end_year


if __name__ == "__main__":
    # function to test if the class works if run as main
    monte = PortfolioSim(2025, 2023, {"Stocks": 600, "Bond": 400},
                         200, 50, 0.03, {"Stocks": 0.6, "Bonds": 0.4}, iterations=1000)
    monte.run_sim()
    results = monte.get_results()
    plt.hist(results, 50)
    plt.show()
    print(results)
