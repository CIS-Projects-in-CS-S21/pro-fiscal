import unittest
from Stock_Sim import Monte_carlo

class Monte_carlo_test(unittest.TestCase):
    """
    A class for testing the Monte-carlo sim

    WARNING: Tests take AGES to run
    """
    # tests that the results are the correct length for two years
    #  At 50 weeks a year, the sim should have a len of 100
    def test_correct_len(self):
        monte = Monte_carlo(2019, 2020, ["AAPL"], [5])
        monte.run_sim()
        results = monte.get_results()
        self.assertEquals(100, len(results))

if __name__ == '__main__':
    unittest.main()