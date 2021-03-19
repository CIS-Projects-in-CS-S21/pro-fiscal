import unittest
from monte_carlo import Monte_carlo

class Monte_carlo_test(unittest.TestCase):
    """
    A class for testing the Monte-carlo sim

    WARNING: Tests take AGES to run
    """

    # tests in the monte-carlo sim results contain the AAPL key
    def test_contains_AAPL(self):
        monte = Monte_carlo(2019, 2020, ["AAPL"], [5])
        monte.run_sim()
        results = monte.get_results()
        self.assertTrue('AAPL' in results)        

    # tests that the results are the correct length for two years
    #  At 50 weeks a year, the sim should have a len of 100
    def test_correct_len(self):
        monte = Monte_carlo(2019, 2020, ["AAPL"], [5])
        monte.run_sim()
        results = monte.get_results()
        self.assertEquals(100, len(results.get('AAPL')))

if __name__ == '__main__':
    unittest.main()