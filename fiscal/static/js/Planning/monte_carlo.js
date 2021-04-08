function render_future_value (forecast_data) {}

function render_monte_interface(){
    function render_monte_form() {

        const submitFunction = () => {
            form_error.innerHTML = "";
            // example input object with null values as a placeholder
            let input_data = {};
            let valid = true;
            // TODO: Get input from the form
            // Validate inputs

            const depositValue = parseFloat(document.getElementById("AnnualDeposit").value);
            const withdrawValue = parseFloat(document.getElementById("incomeToBeWithdrawn").value);
            const inflationRate = parseFloat(document.getElementById("inflation").value);
            const retire_year = document.getElementById("retire-year").value;
            const yearsPeriod = document.getElementById("Years").value;
            const stockBondValue = document.getElementById("stock-bond-select").value;

            // const num = /^\d{8}$/;
            if (currencyValidation(depositValue)) {
                input_data["contribution"] = depositValue;
            } else {
                valid = false;
                form_error.innerHTML += "Please enter valid currency amount for saving <br>";
            }
            if (currencyValidation(withdrawValue)) {
                input_data["monthly_withdrawal"] = withdrawValue;
            } else {
                valid = false;
                form_error.innerHTML += "Please enter valid currency amount for withdrawal <br>";
            }
            if (!isNaN(inflationRate)) {
                input_data["inflation"] = inflationRate;
            } else {
                valid = false;
                form_error.innerHTML += "Please enter valid decimal for inflation rate <br>";
            }
            if (retire_year.match(/^\d{4}$/)) {
                input_data["retire_year"] = parseInt(retire_year);
            } else {
                valid = false;
                form_error.innerHTML += "Please enter valid number for retirement year <br>";
            }
            if (yearsPeriod.match(/^\d{4}$/)) {
                input_data["end_year"] = parseInt(yearsPeriod);
            } else {
                valid = false;
                form_error.innerHTML += "Please enter valid number for simulation end year <br>";
            }
            input_data["retirement_allocation"] = stockBondValues[stockBondValue];

            // Call API
            if(valid) {
                let status_code;
                monte_api.start_sim(input_data)
                    .then((response) => {
                        status_code = response.status;
                        return response.json();
                    }).then((data) => {
                    if (status_code === 202) {
                        message.innerText = "A simulation initiated by this account is already in progress";
                    } else if (status_code === 201) {
                        message.innerText = "Simulation initiated. Please wait."
                    } else if (status_code === 400) {
                        message.innerHTML = "";
                        for (let prop in data)
                            message.innerHTML += data[prop] + '<br>';
                    } else {
                        throw Error("" + status_code)
                    }
                })
                    .catch((error) => {
                        message.innerText = error;
                    });
            }
        }

        const inputNames = [
            {inputText: "Enter the amount that you will save each month before retirement: ", inputId: "AnnualDeposit"},
            {
                inputText: "Enter the amount that you need to withdraw in each month during retirement: ",
                inputId: "incomeToBeWithdrawn"
            },
            {inputText: "Enter your assumption for the future value of inflation rate: ", inputId: "inflation"},
            {inputText: "Enter the year you plan to retire: ", inputId: "retire-year"},
            {inputText: "Enter the year you would like to project future values for: ", inputId: "Years"}
        ]

        // value is the index into stockBondValues
        const stockBondOption = [
            {label: "30% Bonds, 70% Stocks", value: 0},
            {label: "40% Bonds, 60% Stocks", value: 1},
            {label: "50% Bonds, 50% Stocks", value: 2},
            {label: "60% Bonds, 40% Stocks", value: 3},
            {label: "70% Bonds, 30% Stocks", value: 4}];

        const stockBondValues = [
            {Bonds: .30, Stocks: .70},
            {Bonds: .40, Stocks: .60},
            {Bonds: .50, Stocks: .50},
            {Bonds: .60, Stocks: .40},
            {Bonds: .70, Stocks: .30}]

        let elem = document.createElement("div");
        let formParagraph = document.createElement("p");
        formParagraph.classList.add("form-style");
        formParagraph.innerHTML = "Monte Carlo Simulation";
        elem.appendChild(formParagraph);

        let userData = document.createElement("user-data");
        userData.classList.add("user-inputs");
        let simulationDiv = document.createElement("div");
        simulationDiv.id = "simulation";

        const stockBondLabel = document.createTextNode("Choose the percentage of stocks and bonds that your allocation will be: ")
        const selectStockBond = document.createElement("select");
        selectStockBond.id = "stock-bond-select";
        const emptyOption = document.createElement("option");
        emptyOption.disabled = true;
        selectStockBond.appendChild(emptyOption);
        stockBondOption.forEach(stockBond => {
            const option = document.createElement("option");
            option.value = stockBond.value;
            option.innerHTML = stockBond.label;
            selectStockBond.appendChild(option);
        })
        selectStockBond.selectedIndex = 0;

        simulationDiv.appendChild(stockBondLabel);
        simulationDiv.appendChild(selectStockBond);

        inputNames.forEach(input => {
            const label = document.createTextNode(input.inputText);
            const actualInput = document.createElement("input");
            actualInput.id = input.inputId;
            simulationDiv.appendChild(label);
            simulationDiv.appendChild(actualInput);
        })

        const submitButton = document.createElement("button");
        submitButton.id = "submitInfo";
        submitButton.innerHTML = "Submit";
        submitButton.addEventListener("click", submitFunction);
        simulationDiv.appendChild(submitButton);

        let form_error = document.createElement("p");
        userData.appendChild(form_error);
        userData.appendChild(simulationDiv);


        elem.appendChild(userData);
        return elem;
    }

    function render_get_results() {
        const results_handler = () => {
            let status_code;
            monte_api.get_results()
                .then((response) => {
                    status_code = response.status;
                    if(status_code === 200)
                        return response.json();
                    else
                        return response.text();
                }).then((data) => {
                    console.log(data);
                    if (status_code === 202) {
                        message.innerText = "A simulation initiated by this account is currently in progress";
                    }
                    else if (status_code === 204) {
                        message.innerText = "No simulation results were found for this account";
                    }
                    else if (status_code === 200) {
                        // Replace this with call to draw the chart
                        message.innerText = "Got results";
                    }
                    else{
                        throw Error(data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    // message.innerText = error;
                });
        }

        let elem = document.createElement("div");
        elem.classList.add("monte-carlo-results");
        let get_button = createButton({text: "Get Results", onclickhandler: results_handler});
        elem.appendChild(get_button);

        results_handler();
        return elem
    }



    let container = document.createElement("div");
    container.classList.add("monte-carlo-interface");
    let message = document.createElement("p");
    let results_div = render_get_results();
    let form_div = render_monte_form();

    container.appendChild(message);
    container.appendChild(results_div);
    container.appendChild(form_div);

    return container
}
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
