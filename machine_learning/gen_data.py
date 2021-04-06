import csv
import random
from datetime import datetime, timedelta

"""
Categories:
housing:0, transportation:1, debt:2, insurance:3, utilities:4, 
medical/healthcare:5, savings:6, retirement:7, education:8,
groceries/household:9, entertainment:10, essentials:11, non-essentials:12,
other:13

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

def populate_cat_desc(cat_desc, src_list, total_to_add):
    """
    If total_to_add is < -1: adds every item from the src_list to the cat_desc,
        otherwise randomly adds items until total_to_add items are added
    """
    if total_to_add > -1:
        for i in range(total_to_add):
            pos = random.randint(0, len(src_list)-1)
            cat_desc.append(src_list[pos])
    else:
        for item in src_list:
            cat_desc.append(item)


def add_desc_to_cats():
    #adds additional descriptions to the categories
    #list of morgate lenders 0
    mortgage_names = ['Quicken Loans', 'Wells Fargo', 'United Shore',
        'Bank of America', 'JPMorgan Chase', 'loandepot.com', 'Caliber Home Loans',
        'Fairway Independent Mortgage', 'US Bank National Association', 
        'Guaranteed Rate', 'Freedom Mortgage Corporation', 'Flagstar Bank', 
        'Guild Mortgage Company', 'CitiBank', 'Nationstar Mortgage', 
        'Navy Federal Credit Union', 'Citizens Bank', 'Movement Mortgage', 
        'USAA Federal Savings', 'Veterans United Home Loans', 'Homebridge Financial Services',
        'Finance of America Mortgage', 'PNC Bank', 'Broker Solutions', ' PrimeLending',
        'First Republic Bank', 'Crosscountry Mortgage', 'Pennymac Loan services',
        'Home Point Financial', 'Provident Funding Associates', 'CMG Mortgage', 'Suntrust Banks',
        'Newrez', 'Eagle Home Mortgage', 'Cardinal Financial Company', 'Branch Bannking and Trust',
        'Academy mortgage', 'DHI Mortgage', 'The Huntington National Bank', 'Morgan Stanley', 
        'American Pacific Mortgage', 'TD Bank', 'MUFG Union Bank', 'Everett Financial',
        'Stearns Lending', 'Fifth Third Bank', 'Carrington Mortgage', 'American Financial Network',
        'Paramount Residential Mortgage', 'Regions Bank', 'Cornerstone Home Lending', 
        'Prosperity Home Mortgage', 'Primary Residential Mortgage', 'Keybank National',
        'Sierra Pacific Mortgage', 'The Federal Savings bank', 'Synergy One Lending', 'NVR Mortgage',
        'UMPQUA Bank', ' Cherry Creek Mortage', 'Pulte Mortgage', 'Bay Equiety',
        'J.G. Wentworth Home Lending', 'Residential Mortgage Services', 'Amerisave Mortgage',
        'Gateway Mortgage Group', 'UBS Bank', 'Lakeview Loan Servicing', 'TIAA', 'NBKC Bank',
        'Union Home Mortgage', 'City National Bank', 'Barrington Bank & Trust Company',
        'Ameris Bank', 'Summit Funding', 'IMPAC Mortgage Corp', 'American Financing Corporation',
        'State Employee\'s Credit Union', 'Ark-La-Tex Financial SErvices', 'Plaza Home Mortgage']
    #US public transport 1
    public_transport_names = ['Amtrak', 'MTA Long Island', 'NJ Transit Rail', 'MTA Metro-North',
        'SEPTA Regional Rail', 'MBTA Commuter Rail', 'Caltrain', 'Metrolink', 'Denver RTD',
        'MARC Train', 'UTA FrontRunner', 'Sounder Commuter Rail', 'Virginia Railway Express',
        'Tri-Rail', 'NICTD South Shore Line', 'eBART', 'Trinity Railway Express', 'Capitol Corridor',
        'Keystone Service', 'SunRail', 'New York City Subway', 'Washington Metro', 'Chicago L',
        'MBTA subway', 'Bay Area Raoud Transit', 'PATH', 'SEPTA', 'MARTA' 'Metro Rail', 'Metrorail',
        'PATCO Speedline', 'Staten Island Railway', 'Baltimore Metro SubwayLink', 'RTA Rapid Transit',
        'Tren Urbano', 'Greyhound Lines', 'Megabus', 'MTA', 'LACMTA', 'CTA', 'Muni', 'New Jersey Transit',
        'SEPTA', 'King County Metro', 'MBTA', 'WMATA', 'RTD', 'MTA Maryland', 'METRO', 'RTC Transist',
        'TriMet', 'Port Authority', 'AC Transit']
    #List of common companies holding debt 2
    debt_names = ['FedLoan Servicing', 'Granite State', 'Great Lakes Educational Loan Services',
        'HESC', 'Edfinancial', 'MOHELA', 'Navient', 'Nelnet', 'OSLA Servicing', 'ECSI', 
        'Maximus Federal Services', 'Earnest', 'Education Loan Finance', 'College Ave',
        'Sallie Mae', 'Discover', 'Splash Financial', 'U-fi', 'Laurel Road', 'LendKey',
        'PNC', 'RISLA', 'SoFi', 'Citizens Bank', 'EDvestinU', 'CommonBond', 'Ascent', 'VISA',
        'Mastercard', 'CitiBank', 'Chase', 'American Express', 'Capital One', 'Bank of America',
        'Synchrony', 'Wells Fargo', 'Barclay', 'U.S. Bank', 'USAA', 'Credit One', 'PNC Bank']
    #insurance 3
    insurance_names = ['State Farm', 'Berkshire Hathaway', 'Progressive Insurance', 'Allstate',
        'Liberty Mutual', 'Travelers', 'USAA', 'Chubb INA', 'Nationwide', 'American International Group',
        'Farmers Insurance', 'Hartford Insurance', 'American Family', 'Main Street', 'Auto-Owners',
        'Swiss Reinsurance', 'Erie', 'Fairfax Financial', 'Munich-American', 'CNA', 'Tokio Marine',
        'W.R. Berkley', 'Everest Re', 'Cincinnati', 'Alleghany Ins Holdings', 'Hanover Insurance Group',
        'Great American', 'CSAA Insurance', 'Zurich Fincial services', 'Kemper PC', 'MetLife Auto & Home',
        'FM Global', 'AXA U.S.', 'Mercury General', 'Assiramt P&C', 'Markel Corp', 'Arch insurance', 
        'QBE Americas', 'Old Republic', 'Allianz of America', 'Selective insurance', 'AmTrust', 
        'Auto Club Group', 'Country Financial PC', 'America Mutual Group', 'Sompo Holdings',
        'Sentry Insurance', 'AXIS US', 'State Insurance Fund', 'MAPFRE North America', 'National General',
        'NJM Insurance', 'EMC Insurance', 'State Auto Insurance', 'Westfield Group', 'Shelter Insurance',
        'PartnerRe US', 'AF Group', 'Federated Mutual']
    #utilities 4
    #medical/healthcare 5
    #savings6
    #retirement7
    #education8
    #list of population regional US grocery store names 9
    grocery_names = ['Safeway', 'Albertsons', 'Vons', 'Pavilions', 'Jewel-Osco',
        'Acme Markets', 'Shaw\'s', 'Andronico\'s', 'Carrs', 'Haggen', 'Lucky',
        'Pavilions', 'Randalls', 'Star Market', 'Tom Thumb', 'United Supermarkets',
        'Food Lion', 'Stop & Shop', 'Giant Food Stores', 'Hannaford', 'Giant Food',
        'Harris Teeter', 'King Soopers', 'Roundy\'s', 'Smith\'s Food and Drug',
        'Fred Meyer', 'QFC', 'Ruler Foods', 'Food 4 Less', 'City Market', 'Target',
        'Sam\'s Club', 'Bashas\'', 'Raley\'s', 'Save Mart', 'Smart & Final', 
        'WinCo Foods', 'Fareway', 'Hy-Vee', 'Meijer', 'Schnucks', 'SpartanNash',
        'Giant Eagle', 'Market Basket', 'Price Chopper', 'Price Rite', 'ShopRite',
        'Tops', 'Weis', 'Wegmans', 'Brookshire\'s', 'Brookshire Brothers',
        'Food City', 'Harps Food Stores', 'Ingles Markets', 'Piggle Wiggly',
        'Publix', 'BI-LO', 'Harvey\'s', 'Winn-Dixie']
    #populates the category descriptions
    populate_cat_desc(cat_desciptions[0], mortgage_names, -2)
    populate_cat_desc(cat_desciptions[1], public_transport_names, -2)
    populate_cat_desc(cat_desciptions[2], debt_names, -2)
    populate_cat_desc(cat_desciptions[3], insurance_names, -2)
    populate_cat_desc(cat_desciptions[9], grocery_names, -2)

def gen_data(file_name, num_entries):
    #Outputs num_entries number of lines to the csv file file_name
    with open(file_name, 'w', newline='') as csvfile:
        data_writer = csv.writer(csvfile)
        for i in range(num_entries):
            cat_num = pick_cat()
            # date, detail, cost, category
            data_writer.writerow([gen_datetime(2010, 2020)]
                + [get_price(cat_num)] + [get_description(cat_num)] + [cat_names[cat_num]])
def main():
    random.seed(123333)
    add_desc_to_cats()
    gen_data("data_test1.csv", 250)
        

if __name__ == "__main__":
    main()