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
function parseDate(dateString) {
    let arr = dateString.split('-');
    let year = parseInt(arr[0]);
    let month = parseInt(arr[1]) - 1;
    let day = parseInt(arr[2]);

    return new Date(year, month, day);
}

/**
 * @namespace
 */
let monte_vis = {};

/**
 * Function that calls the monte carlo API and requests a simulation initiation
 * @function
 * @memberof monte_vis
 * @param {Array} input array of values pulled from a JSON object
 * @returns {Chart} A histogram based of a bar chart using the ChartJS library
 * @throws {Error} if the input array is null, has negative values, etc.
 */
monte_vis.future_value_chart = function (array) {

    /**
     * Function that calls the monte carlo API and requests a simulation initiation
     * @function
     * @memberOf monte_vis
     * @inner
     * @param {Array} input array of values pulled from a JSON object
     * @param {int} number of bins that is hard coded for the x-axis. This number determines the ranges that the values
     *              will fall into, contributing to their respective range frequencies
     * @returns {Array} array of bin values/ranges
     * @throws {Error} if any of the inputs array are null, negative, etc.
     */
    createHistogram = function (array, numOfBins) {

        const obj = []

        const low = Math.min(...array)
        const high = Math.max(...array)
        const range = high - low;
        let lastStart = null;

        for (i = 0; i < numOfBins; i++) {
            const start = lastStart || Math.floor((i === 0 ? low : low + Math.floor(i * range / numOfBins) + 1) / 100) * 100


            const end = Math.ceil((i === numOfBins ? high : low + Math.ceil((i + 1) * range / numOfBins)) / 100) * 100

            lastStart = end;


            obj.push({
                label: `${start}`,
                val: array.filter(a => (a > start && a < end)).length,
            })
        }

        return obj
    }

    const histo = createHistogram(array, 40)


    var labels = histo.map(function (e) {
        // return '$' + e.label;
        return e.label;
    });

    var data = histo.map(function (e) {
        return e.val;
    });

    // console.log(labels);
    // console.log(data);

    var ctx = document.getElementById("myChart");
    monte_vis.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgb(0, 63, 92)',
                data: data,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Future Value (in Thousands of Dollars)',
                            fontSize: 16
                        },
                        ticks: {
                            fontSize: 14,
                            callback: function(value, index, values){
                                return '$' + value / 1000;
                            }
                        }
                }],
                yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Count of Values per Range',
                            fontSize: 16
                        },
                        ticks: {
                            fontSize: 14
                        }
                }]
            }
        }
    })
    // console.log(monte_vis.chart)

    // Change styling specific to monte carlo visualization
    let chart_container = document.getElementById("chart-container");
    chart_container.style = "width: 80%; height: 60vh;";

    // Used to remove chart from page when user navigates away
    function removeChart() {
            monte_vis.chart.destroy();
            // reset chart sizing
            chart_container.style = "";
        }

    window.addEventListener('hashchange', removeChart);

}
