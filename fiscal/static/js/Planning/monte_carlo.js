/**
 * Function stores the collection of forecast data and provide the visualization of the range of future values output.
 * @param {Array} forecast_data The data that will be used to render potential future value rates for the output.
 * @throws {InvalidArgumentException} if the value is null.
 * @returns {Array} Return arrays of future value.
 */
function render_future_value(forecast_data) {

}

/**
 * Function that give a collection of future value of data.
 * @param {Array} forecast_data The data that will be used to render potential future value rates for the output.
 * @returns {Array} Return a collection of forecast amount of data.
 * @throws {InvalidArgumentException} if the value of data is null.
 */
function future_value_chart() {
    const createVals = (amnt) => {
        const vals = []
        for (i = 0; i < amnt; i++) {
            vals.push(Math.floor(Math.random() * 100))
            // vals.push(i)
        }
        return vals
    }

    Array.prototype.createHistogram = function (numOfBins) {
        const obj = []

        const low = Math.min(...this)
        const high = Math.max(...this)
        const range = high - low;

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

    Array.prototype.bellCurve = function () {
        return this.sort((a, b) => a.val % 2 - b.val % 2 || (a.val % 2 ? b.val - a.val : a.val - b.val))
    }

    const vals = createVals(100);
    const histo = vals.createHistogram(5).bellCurve();

    var labels = histo.map(function (e) {
        return e.label;
    });

    var dataItems = histo.map(function (e) {
        return e.val;
    });;


    function createBarChart(dataItems) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    fill: false,
                    data: dataItems,
                }]
            },
            options: {
                responsive: true
            }
        });

        // Used to remove the Chart when we exit out of the Portfolio Growth Page
        function removeChart() {
            myChart.destroy();
        }

        window.addEventListener('hashchange', removeChart);
    }

    createBarChart(dataItems);

    let title = document.createElement("h3");
    title.innerText = "Monte Carlo Future Value Range Simulation";
    return title;
}