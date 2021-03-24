/**
 * Helper function for Charting that calculates the difference between the start date and the days that the portfolio's value was updated.
 * @param {Array} dateData Array of Dates for a Portfolio
 * @returns {Array} Number of Days since the start of the Portfolio
 */
function calculate_days_after(dateData) {
    const start_date = new Date(dateData[0]);
    let daysAfter = [];

    for (let i = 0; i < dateData.length; i++) {
        let difference = days_after_update(new Date(dateData[i]), start_date);
        daysAfter.push(difference);
    }

    return daysAfter;
}

function render_portfolio_growth() {

    let dateData = [], balanceData = [], daysAfterData = [], maximum = [];
    let chartBalanceData = [], chartDateData = [];
    let maxDays = 0;

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
                // Dynamically create datasets
                let datasets = createDynamicDatasets(portfolios);
                createAreaChart(datasets);
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
        maxDays = maximum.reduce(function (a, b) { return a > b ? a : b });
    }

    const fillInHoles = () => {
        for (let i = 0; i < maximum.length; i++) {
            chartDateData.push(Array.apply(null, Array(maxDays + 1)).map((val, idx) => idx));
            chartBalanceData.push(new Array(maxDays + 1).fill(balanceData[i][0]));
            daysAfterData.push(calculate_days_after(dateData[i]));

            let index = 1;
            for (let j = 1; j <= maxDays; j++) {
                if (j < daysAfterData[i][index] || index >= balanceData[i].length) {
                    chartBalanceData[i][j] = balanceData[i][index - 1];
                } else {
                    chartBalanceData[i][j] = balanceData[i][index];
                    index++;
                }
            }
        }
    }

    const createDynamicDatasets = (portfolios) => {
        let datasets = [];
        let colors = ['rgb(0, 63, 92)', 'rgb(188, 80, 144)', 'rgb(255, 166, 0)',
            'rgb(239, 86, 117)', 'rgb(59, 122, 46)', 'rgb(88, 80, 141)', 'rgb(137, 78, 116)',
            'rgb(237, 130, 85)', 'rgb(133, 85, 237)', 'rgb(133, 237, 85)'];

        for (let i = 0; i < portfolios.length; i++) {
            let item = portfolios[i];

            datasets.push({
                label: item["portfolio_name"],
                backgroundColor: colors[i],
                borderColor: colors[i],
                data: chartBalanceData[i],
                order: (i + 1)
            });
        }

        return datasets;
    }

    function createAreaChart(dataItems) {
        var ctx = document.getElementById('myChart').getContext('2d');

        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: chartDateData[0],
                datasets: dataItems
            },

            // Configuration options go here
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Your Portfolios - Growth'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Days since Starting the Portfolio'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value (in Dollars)'
                        },
                        stacked: true,
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return '$' + value;
                            }
                        }
                    }]
                }
            }
        });

        // Used to remove the Chart when we exit out of the Portfolio Growth Page
        function removeChart() {
            chart.destroy();
        }

        window.addEventListener('hashchange', removeChart);
    }

    getPortfolioChangeData();

    let contents = document.createElement("h3");
    contents.innerText = "Your Portfolios - Growth"; // Username here
    return contents;
}