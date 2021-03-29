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

/**
 * Helper function that parses dates in 'YYYY-MM-DD' string format to a date object
 * @param dateString
 * @returns {Date}
 */
function parseDate(dateString){
    let arr = dateString.split('-');
    let year = parseInt(arr[0]);
    let month = parseInt(arr[1]) - 1;
    let day = parseInt(arr[2]);

    return new Date(year, month, day);
}

function render_portfolio_growth() {

    var contents = document.createElement("div");
    let header = document.createElement("h3");
    header.innerText = "Your Portfolios - Growth"; // Username here
    let error = document.createElement("p");
    contents.style.textAlign = "center";
    contents.appendChild(header);
    contents.appendChild(error);


    let dateData = [], balanceData = [], daysAfterData = [], maximum = [];
    let chartBalanceData = [];
    let chartDateData;
    let maxDays = 0;

    const getPortfolioChangeData = () => {
        let portfolios = "";

        let url = "/planning/portfolio/"
        let init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': "token " + localStorage.getItem("key")
            }
        }

        fetch(url, init)
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
            }).catch((msg) => {
                error.innerText += msg + '<br>';
        })
    }

    const extractPortfolioBalanceDates = (portfolios) => {
        for (let i = 0; i < portfolios.length; i++) {
            let item = portfolios[i];

            // Get Balance History arrays
            dateData[i] = item["balance_history"]["date"];
            balanceData[i] = item["balance_history"]["balance"]

            // add the current balance and date
            dateData[i].push(item["date"]);
            balanceData[i].push(item["balance"]);

        }

    }

    // Generate an array of date objects from the earliest portfolio date to the present
    const generateDateArr = () => {
        function addDays(date, days) {
            var new_date = new Date(date.valueOf());
            new_date.setDate(date.getDate() + days);
            return new_date;
        }

        let startDate = parseDate(dateData[0][0]);
        for (let i = 1; i < dateData.length; i++){
            let date = parseDate(dateData[i][0]);
            if (date < startDate){
                startDate = date;
            }
        }
        let dateArr = [];
        let stopDate = new Date();
        let current = startDate;
        while(current < stopDate){
            dateArr.push(current);
            current = addDays(current, 1);
        }

        return dateArr;
    }

    // Use the preceding balance values to create a continuous data set
    const fillInHoles = () => {
        let dates = generateDateArr();
        chartDateData = dates;
        for(let i = 0; i < balanceData.length; i++){
            chartBalanceData.push([]);
            let index = 0;
            let j = 0;
            // Zero out the inital array
            chartBalanceData[i].fill(0, dates.length);
            let curr_date = parseDate(dateData[i][index]);
            // Skip the values before the inception date
            for(; dates[j] < curr_date; j++){
                continue;
            }
            for(; j < dates.length; j++){
                if (curr_date >= dates[j] || index + 1 >= balanceData[i].length) {
                    chartBalanceData[i][j] = balanceData[i][index];
                } else {
                    chartBalanceData[i][j] = balanceData[i][index];
                    index++;
                    curr_date = parseDate(dateData[i][index]);
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
                label: item["name"],
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
                labels: chartDateData,
                datasets: dataItems
            },

            // Configuration options go here
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    labels: {
                        fontSize: 18
                    }
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
                        type: 'time',
                        time: {
                            unit: 'month',
                            tooltipFormat: "MM/DD/YYYY"
                        },
                        ticks: {
                            fontSize: 14
                        }

                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value (in Dollars)',
                            fontSize: 16
                        },
                        stacked: true,
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return '$' + value;
                            },
                            fontSize: 14
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

    return contents;
}