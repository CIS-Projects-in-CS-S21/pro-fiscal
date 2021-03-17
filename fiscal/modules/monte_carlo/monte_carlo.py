import pandas_datareader.data as web
import pandas as pd
import numpy as np
import datetime as dt
import matplotlib.pyplot as plt
from matplotlib import style


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
        self.__iterations = 100

        

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

    def main():
        style.use('ggplot')

        start = dt.datetime(2019,1,1)
        end = dt.datetime(2019,12,31)
        # getting Apple stock prices from yahoo
        prices = web.DataReader('AAPL','yahoo', start,end)['Adj Close']
        # getting returns
        returns = prices.pct_change()
        last_price  = prices[-1]
        # simulation
        num_simulations = 1000
        trading_days = 252

        sim_data = pd.DataFrame() #dataframe for simulation results
        for x in range(num_simulations):
            count=0
            daily_vol = returns.std()
            
            price_series = []
            price = last_price*(1+np.random.normal(0,daily_vol))
            price_series.append(price)
            
            for i in range(trading_days):
                if count == 251:
                    break
                price = price_series[count]*(1+np.random.normal(0,daily_vol))
                price_series.append(price)
                count+=1
                
            sim_data[x] = price_series
            
        fig = plt.figure()
        fig.suptitle('Monte Carlo Simulation')
        plt.plot(sim_data)
        plt.show()


    if __name__ == "__main__":
        main()