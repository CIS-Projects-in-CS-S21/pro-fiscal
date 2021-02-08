# Project overview

### Abstract
Fiscal is a web application designed to bring easy to use, private, and open-source financial planning tools to users.  By aggregating balances and holdings from different accounts, users will create a big picture view of their finances as they plan for retirement or other financial goals.  Fiscal will provide tools for analyzing and visualizing important insights such as diversification, taxability of assets, and liquidity/accessibility.  A Monte Carlo Simulation will aid in projecting future performance of investments. The application will also include features to help users plan and save for their financial goals. Users will be able to track income vs. categorized monthly outlay to facilitate budgeting and identify areas where savings can be found.  Additional value will be added to the application through two machine learning tasks.  Cluster analysis on user data will help gain insight into the user's investing behaviors and risk tolerance.  Fiscal will also classify budget line items into categories to facilitate spending analysis.

### Conceptual Design
Fiscal will be designed as a single-page web application with a frontend consisting of HTML, CSS, and JavaScript.  Interactive data visualizations will be created using a JavaScript library such as d3.js.  The backend will utilize the Django web framework which is written in Python.  Use of Python for the server side functionality will allow simple integration of the rich data and statistics tools that exist in the Python ecosystem.  Data persistence will be provided through an open-source SQL database such as PostgreSQL or MariaDB.

### Background
As a core principle Fiscal will be focused on providing tools and personal finance education resources to its users without an upfront cost or hidden cost through sacrificing data privacy.  While other applications exist that provide a similar toolset to Fiscal, namely Quicken and Mint, they are proprietary and focused on budgeting rather than long-term financial planning.  An important distinction between Quicken and Fiscal is the portability of the software, as Quicken is installation-based.  Where Fiscal is committed to data privacy and free access, Mint generates revenue by anonymizing and selling user data.

### Required Resources
It will be necessary to find a hosting platform for Fiscal.  Research will need to be conducted to identify an option suitable to the needs of the project and the technology stack.  I have only introductory experience using Django and will need to become more comfortable with the framework.  Fiscal will require a securities API like Alpha Vantage to provide historical data for the Monte Carlo Simulation.  Both of the machine learning tasks will require the creation or acquisition of a suitable dataset for training the models.

# Contributors
* Christopher Scott
* Jason Duong
* Tizita Hailu
* Harith Siddiqui
* Benjamin Levin

