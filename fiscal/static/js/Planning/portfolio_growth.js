/**
 * 
 * @param {Date} curr_date The current Date
 * @param {Date} start_date The Date where the user first purchased the Portfolio
 * @returns {int} Denotes how many days has passed from start_date to curr_date
 */
const days_after_update = (curr_date, start_date) => {
    return parseInt((curr_date - start_date) / (1000 * 60 * 60 * 24), 10);
};

function calculate_days_after(dateData) {
    const start_date = new Date(dateData[0]);
    let daysAfter = [];

    for (let i = 0; i < dateData.length; i++) {
        let date = new Date(dateData[i]);
        let difference = days_after_update(date, start_date);
        daysAfter.push(difference);
    }

    return daysAfter;
}

function render_portfolio_growth() {

    let dateData = [], balanceData = [], daysAfterData = [], maximum = [];
    let chartBalanceData = [], chartDateData = [];

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
                extractPortfolioBalanceDates(portfolios);
                fillInHoles();
            })
            .then(() => {
                createAreaChart();
            })
    }

    const extractPortfolioBalanceDates = (portfolios) => {
        for (let i = 0; i < portfolios.length; i++) {
            let item = portfolios[i];

            dateData[i] = item["dates"];
            balanceData[i] = item["balances"];

            dateData[i].push(item["latest_balance"]["date"]);
            balanceData[i].push(item["latest_balance"]["balance"]);

            let max = dateData[i].reduce(function (a, b) { return new Date(a) > new Date(b) ? new Date(a) : new Date(b); });
            maximum.push(days_after_update(max, new Date(dateData[i][0])));
        }
    }

    const fillInHoles = () => {

        for (let i = 0; i < maximum.length; i++) {
            chartDateData.push(Array.apply(null, Array(maximum[i] + 1)).map((val, idx) => idx));
            chartBalanceData.push(new Array(maximum[i] + 1).fill(balanceData[i][0]));
            daysAfterData.push(calculate_days_after(dateData[i]));

            let index = 1;
            for (let j = 1; j <= maximum[i]; j++) {                
                if (j < daysAfterData[i][index]) {
                    chartBalanceData[i][j] = balanceData[i][index-1];
                } else {
                    chartBalanceData[i][j] = balanceData[i][index];
                    index++;
                }
                
            }
        }
        
        // console.log(chartDateData);
        // console.log(chartBalanceData);
    }

    function createAreaChart() {
        var ctx = document.getElementById('myChart').getContext('2d');

        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: chartDateData[1],
                datasets: [{
                    label: "MyTestAccount",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chartBalanceData[0],
                    order: 1
                }, {
                    label: "MyTestAccount2 - Electric Boogaloo",
                    backgroundColor: 'rgb(7, 47, 95)',
                    borderColor: 'rgb(7, 47, 95)',
                    data: chartBalanceData[1],
                    order: 2
                }]
            },

            // Configuration options go here
            options: {}
        });

        function removeChart () {
            console.log("Removing Chart");
            chart.destroy();
        }

        window.addEventListener('hashchange', removeChart);
    }



    getPortfolioChangeData();

    let contents = document.createElement("h3");
    contents.innerText = "Testing Portfolio Growth";

    return contents;
}