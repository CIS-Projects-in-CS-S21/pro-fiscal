/**
 * Function stores the collection of forecast data and provide the visualization of the range of future values output.
 * @param {Array} forecast_data The data that will be used to render potential future value rates for the output.
 * @throws {InvalidArgumentException} if the value is null.
 * @returns {Array} Return arrays of future value.
 */
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
 * Function that give a collection of future value of data.
 * @param {Array} forecast_data The data that will be used to render potential future value rates for the output.
 * @returns {Array} Return a collection of forecast amount of data.
 * @throws {InvalidArgumentException} if the value of data is null.
 */
function future_value_chart (forecast_data) {
}
