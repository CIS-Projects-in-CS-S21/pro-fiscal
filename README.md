# Setting up the Environment and Dependencies

1. Clone the repository to your local system
2. Navigate to the project directory ('pro-fiscal')
3. Create a new virtual environment while using Python 3.8.8
4. Use pip to install the dependencies using the requirements.txt file
5. Navigate to the fiscal directory
6. Install the required node modules

*We are calling the virtual environment directory "env"*

On Mac or Linux:

- `mkdir env`
- `python3 -m venv env`
    - The command for python 3.8 may be different on your system
- `source env/bin/activate`
- `pip install -r requirements.txt`
- `cd fiscal`
    - pro-fiscal/fiscal
- `npm install`

On Windows:

- `mkdir env`
- `python -m venv env`
- `.\env\Scripts\activate.bat`
- `pip install -r requirements.txt`
- `cd fiscal`
    - pro-fiscal/fiscal
- `npm install`

The virtual environment can be deactivated using `deactivate env`.

## Running:

- Activate the python venv
- `cd fiscal`
    - pro-fiscal/fiscal
- `python manage.py runserver`
    - The command for python 3.8 may be different on your system

# Project overview

### Description
Fiscal is a web application designed to bring easy to use, private, and open-source financial planning tools to users.  Whether you need to keep track of investments, plan for retirement, or manage your expenses Fiscal has tools for you!

### Abstract
Fiscal is a web application designed to bring easy to use, private, and open-source financial planning tools to users. By aggregating balances and holdings from different accounts, users will create a big picture view of their finances as they plan for retirement or other financial goals. Fiscal will provide tools for analyzing and visualizing important insights such as diversification, taxability of assets, and liquidity/accessibility. A Monte Carlo Simulation will aid in projecting future performance of investments. The application will also include features to help users plan and save for their financial goals. Users will be able to track income vs. categorized monthly outlay to facilitate budgeting and identify areas where savings can be found. Additional value will be added to the application through two machine learning tasks. Cluster analysis on user data will help gain insight into the user's investing behaviors and risk tolerance. Fiscal will also classify budget line items into categories to facilitate spending analysis. 
Fiscal also has accommodations based on the user’s experience with personal finance: A Basic Setting geared towards those inexperienced with personal finance designed around ease of use, and an Advanced Setting that provides additional inputs for more fine-grained control. To assist beginner users with understanding personal finance (and Fiscal itself), educational resources in the form of glossary terms and documentation on how to use the application are provided. Lastly, users will be anonymous to maintain user privacy, and security recovery measures are included to ensure users can recover their account information.

### Conceptual Design
Fiscal will be designed as a single-page web application with a frontend consisting of HTML, CSS, and JavaScript with Bootstrap. Interactive data visualizations will be created using the Chart.js JavaScript library. The backend will utilize the Django web framework which is written in Python. Use of Python for the server-side functionality will allow simple integration of the rich data and statistics tools that exist in the Python ecosystem. Data persistence will be provided through an open-source SQL database such as PostgreSQL.

### Background
As a core principle, Fiscal will be focused on providing financial planning tools to users while respecting and protecting their data privacy. While other applications exist that provide a similar toolset to Fiscal, namely Quicken and Mint, they are proprietary and focused on budgeting rather than long-term financial planning. An important distinction between Quicken and Fiscal is the portability of the software, as Quicken is installation-based. Where Fiscal is committed to data privacy and free access, Mint generates revenue by anonymizing and selling user data.


# Contributors
* Christopher Scott
* Jason Duong
* Tizita Hailu
* Harith Siddiqui
* Benjamin Levin
