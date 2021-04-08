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

Array.prototype.createHistogram = function (numOfBins) {
    const obj = []

    const low = Math.min(...this)
    const high = Math.max(...this)
    const range = high - low;

    console.log(low, high, range)

    for (i = 0; i < numOfBins; i++) {
        const start = i === 0 ? low : low + Math.floor(i * range / numOfBins) + 1

        const end = i === numOfBins ? high : low + Math.ceil((i + 1) * range / numOfBins)

        obj.push({
            label: `${start} - ${end}`,
            val: this.filter(a => (a >= start && a <= end)).length,
        })
    }

    return obj
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

let monte_vis = {};
monte_vis.future_value_chart = function (array) {

    Array.prototype.createHistogram = function (numOfBins) {


        const obj = []

        const low = Math.min(...this)
        const high = Math.max(...this)
        const range = high - low;
        let lastStart = null;

        for (i = 0; i < numOfBins; i++) {
            const start = lastStart || Math.floor((i === 0 ? low : low + Math.floor(i * range / numOfBins) + 1) / 100) * 100


            const end = Math.ceil((i === numOfBins ? high : low + Math.ceil((i + 1) * range / numOfBins)) / 100) * 100

            lastStart = end;


            obj.push({
                label: `${start}`,
                val: this.filter(a => (a > start && a < end)).length,
            })
        }

        return obj
    }

    const histo = array.createHistogram(20)


    var labels = histo.map(function (e) {
        return '$' + e.label;
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
                // backgroundColor: 'rgb(0, 63, 92)',
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
                            labelString: 'Future Value (in Dollars)',
                            fontSize: 16
                        }
                }]
            }
        }
    })
    // console.log(monte_vis.chart)

    // Used to remove chart from page when user navigates away
    function removeChart() {
            monte_vis.chart.destroy();
        }

    window.addEventListener('hashchange', removeChart);

}
