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

class StockSim:
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
    
    def __init__(self, start_year, end_year, asset_names, shares_held):
        """
        Initializes the Monte_carlo object
        """
        self.__iterations = 1000
        self.__sim_results = {}
        self.__weekly_vols = []
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
            
        # create pandas DataFrame for results
        results = pd.DataFrame()
        
        #sim loop
        for x in range(self.__iterations):
            count = 0
            
            prices_weighted = []

            prev_prices = []
            # create and add first simulated price
            for i in range(len(self.__weekly_vols)):
                prev_prices.append(self.__last_prices[i]*(1+np.random.normal(0, self.__weekly_vols[i])))
            # apply weight and shares held to price
            prices_weighted.append(self.__get_total_val(prev_prices))
            
            #loop through each financial week in a year (252 days rounds to 50 weeks)
            for i in range(self.__total_years*50):
                if count == (self.__total_years*50) - 1:
                    break
                prices = []
                # create and add next simulated price
                for j in range(len(self.__weekly_vols)):
                    prices.append(prev_prices[j]*(1+np.random.normal(0, self.__weekly_vols[j])))
                #apply weight and shares held to price
                prices_weighted.append(self.__get_total_val(prices))
                prev_prices = prices
                count += 1
            
            results[x] = prices_weighted

        self.__sim_results = results

    def __get_total_val(self, prices):
        out = 0
        for i in range(len(prices)):
            out += prices[i] * self.__shares_held[i] * self.__weights[i]
        return out

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
        #iterate through 
        count = 0

        price_dict = {}

        for entry in self.__asset_names:

            avgs = []

            # iterate through each year

            # fetch price data for the year
            prices = web.DataReader(self.__asset_names[count], 'yahoo', dt.datetime(self.__start_year, 1, 1), 
                dt.datetime(self.__end_year, 12, 31))['Adj Close']
            # find yearly average and append to avgs
            pos = 0
            #add average weekly price
            for i in range(50 * self.__total_years):
                #append average of 5 day slice to avgs
                avgs.append(np.average(prices[pos:(pos+5)]))
                pos += 5
                #add last price to array
                if (i == self.__total_years*50 - 1):
                    self.__last_prices.append(np.average(prices[pos:(pos+5)]))

            count += 1

            price_dict[entry] = avgs

        pricesDf = pd.DataFrame(price_dict)
        historical_returns = pricesDf.pct_change()
        #find yearly volatility
        self.__weekly_vols = historical_returns.std()
        

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

    def __get_weights(self):
        # find the weight of each asset and stores it in a list which is returned
        total = sum(self.__shares_held)
        out = []
        for num in self.__shares_held:
            out.append(num/total)
        return out

if __name__ == "__main__":
    # function to test if the class works if run as main
    monte = StockSim(2019, 2020, ["AAPL", "MSFT"], [20, 20])
    monte.run_sim()
    # results = monte.get_results()
    # print(results)