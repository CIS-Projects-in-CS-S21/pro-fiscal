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
            // example input object with null values as a placeholder
            let input_data = {
                retire_year: null,
                end_year: null,
                contribution: null,
                monthly_withdrawal: null,
                inflation: null,
                retirement_allocation: null
            }

            // TODO: Get input from the form
            // Validate inputs

        const depositValue = document.getElementById("AnnualDeposit").value
        const withdrawValue = document.getElementById("incomeToBeWithdrawn").value
        const inflationRate = document.getElementById("inflation").value
        const yearsPeriod = document.getElementById("Years").value
        const stockBondValue = document.getElementById("stock-bond-select").value
           const num = /^\d{8}$/;
         if(depositValue.match(num)){
                  return true;}
            else{
                 message.innerText = "Please enter valid number"
                 }
          if(withdrawValue.match(num)){
                 return true;}
            else{
                 message.innerText = "Please enter valid number"
                  }
          if(inflationRate.match(num)){
                 return true;}
            else{
                  message.innerText = "Please enter valid number"
                  }
           if(yearsPeriod.match(num)){
                 return true;}
            else{
                  message.innerText = "Please enter valid number"
                }

            // Call API
            let status_code;
            monte_api.start_sim(input_data)
                .then((response) => {
                    status_code = response.status;
                    return response.json();
                }).then((data) => {
                    if (status_code === 202) {
                        message.innerText = "A simulation initiated by this account is already in progress";
                    }
                    else if (status_code === 201) {
                        message.innerText = "Simulation initiated. Please wait."
                    }
                    else if (status_code === 400) {
                        message.innerHTML = "";
                        for (let prop in data)
                            message.innerHTML += data[prop] + '<br>';
                    }
                    else{
                        throw Error("" + status_code)
                    }
                })
                .catch((error) => {
                    message.innerText = error;
                });
        }

        const inputNames = [
            {inputText: "Enter the amount that you need to withdrawn in each month: ", inputId: "AnnualDeposit"},
            {
                inputText: "Enter the amount that you need to add to saving until retirement: ",
                inputId: "incomeToBeWithdrawn"
            },
            {inputText: "Enter you assumption for the future value of inflation rate: ", inputId: "inflation"},
            {inputText: "Enter the number of years that you left for the retirement: ", inputId: "Years"}
        ]

        const stockBondOption = ["30% Bonds, 70% Stocks", "40% Bonds, 60% Stocks", "50% Bonds, 50%Stocks", "60% Bonds, 40% Stocks", "70% Bonds, 30% Stocks"];


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
        selectStockBond.classList.add("stock-bond-select")
        const emptyOption = document.createElement("option");
        emptyOption.disabled = true;
        selectStockBond.appendChild(emptyOption);
        stockBondOption.forEach(stockBond => {
            const option = document.createElement("option");
            option.value = stockBond;
            option.innerHTML = stockBond;
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
