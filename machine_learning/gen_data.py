import csv
import random
from datetime import datetime, timedelta

"""
Categories:
housing, transportation, debt, insurance, utilities, 
medical/healthcare, savings, retirement, education,
groceries/household, entertainment, essentials, non-essentials,
other

List of entries for each category

Format:
date, detail, cost (xx.xx), category
"""
cat_names = ['Housing', 'Transportation', 'Debt', 'Insurance',
                'Utilities', 'Medical/Healthcare', 'Savings', 'Retirement',
                'Education', 'Groceries/Household', 'Entertainment', 'Essentials',
                'Non-Essentials', 'Other']

def pick_cat():
    return (random.randint(0, len(cat_names)-1))

def gen_datetime(min_year, max_year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    out = start + (end - start) * random.random()
    return (out.date())

def main():
    random.seed(123333)
    num_entries = 25
    file_name = "data_test1.csv"
    with open(file_name, 'w', newline='') as csvfile:
        data_writer = csv.writer(csvfile)
        for i in range(num_entries):
            cat_num = pick_cat()
            # date, detail, cost, category
            data_writer.writerow([gen_datetime(1970, 2020)]+[cat_names[cat_num]])
        

if __name__ == "__main__":
    main()