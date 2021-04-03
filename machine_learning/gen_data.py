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

cat_desciptions = [['Rent payment', 'Morgage payment', 'property taxes', 'HOA dues',
        'Home repairs'], ['Bus fair', 'Subway ticket', 'Train ticket', 'Plane ticket',
        'Gasoline', 'Toll', 'Uber fair'], ['Student Loans', 'Car Payment', 'Phone Payment',
        'Credit Card payment', 'loan payment'], ['Car Insurance', 'Health Insurance',
        'Flood insurance', 'Life insurance', 'Fire Insurance'], ['Gas bill', 'Internet bill', 
        'electricity', 'Water', 'Oil payment', 'Phone bill', 'Cable bill'], ['Rainy day fund', 
        'savings account', 'college fund'], ['PCP visit', 'Medication refill', 'Eye exam', 
        'Dentist visit'], ['401k', 'IRA'], ['Textbooks', 'Tuition', 'Online course', 'Exam fees',
        'School supplies', 'Pet food'], ['Grocery shopping', 'Cleaning supplies', 'Homegoods'],
        ['Movies', 'Books', 'Museums', 'Vacation', 'Sports game', 'Dining out'], ['Emergency',
        'Vet bill', 'Sudden travel expense'], ['New TV', 'Black friday sale', 'Ski tickets'],
        ['GME YOLO']]

def pick_cat():
    #returns a random number of a category type
    return (random.randint(0, len(cat_names)-1))

def gen_datetime(min_year, max_year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    out = start + (end - start) * random.random()
    return (out.date())

def get_price(category):
    #returns a random price in a uniform range rounded to 2 decimal places
    cat_prices = [(500.0, 5000.0), (50.0, 600.0), (100.0, 10000.0), (50.0, 1500.0),
                  (60.0, 2000.0), (100.0, 20000.0), (50.0, 20000.0), (50.0, 20000.0),
                  (0.0, 12000.0), (50.0, 500.0), (0.0, 1000.0), (30.0, 1000.0),
                  (0.0, 1000.0), (0.0, 1000.0)]
    return round(random.uniform(cat_prices[category][0], cat_prices[category][1]), 2)

def get_description(category):
    #returns a random description for the category
    des_num = random.randint(0, len(cat_desciptions[category])-1)
    return cat_desciptions[category][des_num]

def main():
    random.seed(123333)
    num_entries = 250
    file_name = "data_test1.csv"
    with open(file_name, 'w', newline='') as csvfile:
        data_writer = csv.writer(csvfile)
        for i in range(num_entries):
            cat_num = pick_cat()
            # date, detail, cost, category
            data_writer.writerow([gen_datetime(1970, 2020)]
                + [get_price(cat_num)] + [get_description(cat_num)] + [cat_names[cat_num]])
        

if __name__ == "__main__":
    main()