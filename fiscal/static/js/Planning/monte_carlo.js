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

function future_value_chart() {

    const JSON_OBJ = {
        "id": 1,
        "user": 13,
        "results": {
            "future_values": [
                1046.56,
                1154.94,
                1542.59,
                1387.89,
                1196.59,
                1170.66,
                1126.76,
                1317.22,
                1304.45,
                1034.08,
                1134.68,
                1463.98,
                1426.3,
                1061.88,
                1063.89,
                1227.6,
                914.21,
                1407.47,
                1785.84,
                1372.43,
                1102.14,
                1019.35,
                1453.75,
                1129.94,
                1050.23,
                1022.35,
                1285.19,
                989.67,
                1293.87,
                1044.2,
                1145.93,
                1180.85,
                1233.69,
                957.45,
                1197.92,
                938.91,
                922.07,
                1342.5,
                1093.55,
                1131.41,
                978.18,
                1264.0,
                1072.6,
                992.54,
                1305.09,
                1341.14,
                883.39,
                1279.41,
                1041.69,
                816.95,
                1281.63,
                1440.59,
                1104.21,
                1223.67,
                890.39,
                1106.15,
                1378.08,
                1124.14,
                1174.4,
                1526.44,
                1312.38,
                1081.32,
                1083.36,
                1062.83,
                1659.96,
                1227.95,
                1369.67,
                1016.39,
                938.22,
                1578.99,
                1125.93,
                1279.15,
                1343.06,
                1435.16,
                1311.89,
                1306.03,
                1610.26,
                945.09,
                923.05,
                1209.17,
                1083.22,
                1583.71,
                1194.65,
                1133.85,
                1117.75,
                1432.3,
                998.02,
                1143.44,
                1039.65,
                1706.64,
                982.13,
                1006.56,
                1316.14,
                1855.39,
                1176.8,
                1652.08,
                1494.07,
                1340.12,
                1326.41,
                1055.55,
                1286.75
            ]
        },
        "date": "2021-04-03T14:40:46.314997Z"
    }

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

    Array.prototype.bellCurve = function () {
        return this.sort((a, b) => a.val % 2 - b.val % 2 || (a.val % 2 ? b.val - a.val : a.val - b.val))
    }

    const histo = JSON_OBJ.results.future_values.createHistogram(10)


    var labels = histo.map(function (e) {
        return e.label;
    });

    var data = histo.map(function (e) {
        return e.val;
    });

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        responsive: true,
        data: {
            labels: labels,
            datasets: [{
                label: 'Jason',
                fill: false,
                data: data,
            }]
        }
    })
    /* range = Math.max(array) - Math.min(array);
    bucket_range = range/numBuckets;
    for(i in array.length){
      index = Math.floor(array[i]  / bucket_range);
      new_array[index]++;
    } */


}