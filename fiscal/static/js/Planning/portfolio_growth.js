function render_portfolio_growth() {

    let dateData = [], balanceData = [];

    const getPortfolioChangeData = () => {
        let portfolios = "";

        fetch("/static/json/portfolio_growth.json")
            .then(response => {
                return response.json();
            })
            .then((data) => {
                portfolios = data;
            })
            .then(() => {
                extractPortfolioBalanceDates(portfolios, 0);
            })
            .then(() => {
                createAreaChart();
            })
    }

    const extractPortfolioBalanceDates = (portfolios, index) => {
        let item = portfolios[index];

        dateData = item["dates"];
        balanceData = item["balances"];

        dateData.push(item["latest_balance"]["date"]);
        balanceData.push(item["latest_balance"]["balance"]);
    }

    function createAreaChart() {
        var ctx = document.getElementById('myChart').getContext('2d');

        console.log(balanceData);
        console.log(dateData);

        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: dateData,
                datasets: [{
                    label: "User's Portfolio Growth",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: balanceData
                }]
            },

            // Configuration options go here
            options: {}
        });
    }

    getPortfolioChangeData();

    let portfolioDiv = document.createElement("div");

    let contents = document.createElement("h3");
    contents.innerText = "Testing Portfolio Growth";

    portfolioDiv.appendChild(contents);

    return contents;
}