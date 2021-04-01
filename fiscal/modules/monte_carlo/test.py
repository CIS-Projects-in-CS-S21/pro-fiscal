from django.test import TestCase
from modules.monte_carlo.portfolio_sim import PortfolioSim
from modules.monte_carlo.stock_sim import StockSim


class StockSim_Test(TestCase):
    """
    A class for testing the Monte-carlo sim

    WARNING: Tests take AGES to run
    """
    # tests that the results are the correct length for two years
    #  At 50 weeks a year, the sim should have a len of 100
    def test_correct_len(self):
        monte = StockSim(2019, 2020, ["AAPL"], [5])
        monte.run_sim()
        results = monte.get_results()
        self.assertEquals(100, len(results))

class PortfolioSim_Test(TestCase):
    """
    A class for testing the Portfolio Monte Carlo Sim
    """

    def test_correct_shape(self):
        monte = PortfolioSim(2022, 2025, {"Stocks": 0.6, "Bond": 0.4},
                             50, 5, 0.02, {"Stocks": 600, "Bonds": 400}, iterations=100)
        monte.run_sim()
        results = monte.get_results()
        self.assertEquals(len(results), 100)