function render_future_value (forecast_data) {}

function render_monte_interface(){
    function render_monte_form() {

        const submitFunction = () => {
            form_error.innerHTML = "";

            let input_data = {};
            let valid = true;

            const depositValue = parseFloat(document.getElementById("AnnualDeposit").value);
            const withdrawValue = parseFloat(document.getElementById("incomeToBeWithdrawn").value);
            const inflationRate = parseFloat(document.getElementById("inflation").value);
            const retire_year = document.getElementById("retire-year").value;
            const yearsPeriod = document.getElementById("Years").value;
            const stockBondValue = document.getElementById("stock-bond-select").value;

            let current_year = new Date(Date.now()).getFullYear()

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
                let years = parseInt(retire_year);
                if(years >= current_year) {
                    input_data["retire_year"] = years;
                }
                else {
                    valid = false;
                    form_error.innerHTML += "Retirement year may not be in the past<br>";
                }
            } else {
                valid = false;
                form_error.innerHTML += "Please enter valid number for retirement year <br>";
            }
            if (yearsPeriod.match(/^\d{4}$/)) {
                let years = parseInt(yearsPeriod);
                if(years > current_year) {
                    input_data["end_year"] = years;
                }
                else {
                    valid = false;
                    form_error.innerHTML += "Simulation end year may not be in the past<br>";
                }
            } else {
                valid = false;
                form_error.innerHTML += "Please enter valid number for simulation end year <br>";
            }
            input_data["retirement_allocation"] = stockBondValues[stockBondValue];

            // Call API
            if(valid) {
                let status_code;
                message.innerText = "";
                monte_api.start_sim(input_data)
                    .then((response) => {
                        status_code = response.status;
                        return response.json();
                    }).then((data) => {
                    if (status_code === 202) {
                        let msg = "A simulation initiated by this account is already in progress";
                        message.innerText = msg;
                    } else if (status_code === 201) {
                        let msg = "Simulation initiated. Please wait."
                        message.innerText = msg;
                    } else if (status_code === 400) {
                        message.innerHTML = "";
                        if(data["Errors"]){
                            for (let prop in data["Errors"])
                                message.innerHTML += data["Errors"][prop] + '<br>';
                        }
                    } else {
                        throw Error("" + status_code)
                    }
                })
                    .catch((error) => {
                        message.innerText = error;
                    });
                modal.hideModal();
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
            {Bonds: .70, Stocks: .30}];

        let elem = document.createElement("div");
        elem.classList.add("monte-form-container");
        let title = document.createElement("h4");
        title.innerText = "New Simulation";


        let simulationDiv = document.createElement("div");
        simulationDiv.classList.add("user-inputs");

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

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("button-container");
        const submitButton = createButton({text: "Submit", type: "btn-success", onclickhandler: submitFunction});
        const cancelButton = createButton({text: "Cancel", type: "btn-danger", onclickhandler: modal.hideModal});
        buttonDiv.appendChild(submitButton);
        buttonDiv.appendChild(cancelButton);

        let form_error = document.createElement("p");
        elem.appendChild(title);
        elem.appendChild(form_error);
        elem.appendChild(simulationDiv);
        elem.appendChild(buttonDiv);

        return elem;
    }

    function render_get_results() {
        const results_handler = () => {
            let status_code;
            message.innerText = "";
            monte_api.get_results()
                .then((response) => {
                    status_code = response.status;
                    if(status_code === 200)
                        return response.json();
                    else
                        return response.text();
                }).then((data) => {
                    if (status_code === 202) {
                        message.innerText = "A simulation initiated by this account is currently in progress";
                    }
                    else if (status_code === 204) {
                        message.innerText = "No simulation results were found for this account";
                    }
                    else if (status_code === 200) {
                        message.innerText = "Displaying most recent simulation";
                        // have to remove any chart on the page first
                        if(monte_vis.chart){
                            monte_vis.chart.destroy();
                        }
                        monte_vis.future_value_chart(data.results.future_values);
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

        let get_button = createButton({text: "Get Results", onclickhandler: results_handler});

        results_handler();
        return get_button;
    }


    let modal = modalFW({className: "modal-monte"});
    let form_div = render_monte_form();
    let container = document.createElement("div");
    container.classList.add("monte-container");
    
    let header = document.createElement("h3");
    header.innerText = "Monte Carlo Simulation";
    
    let interface_items = document.createElement("div");
    interface_items.classList.add("monte-carlo-interface");
    let instructions = document.createElement("p");
    instructions.innerHTML = `
        <h4>Instructions</h4>
        <ul>
            <li>This simulation uses a random process to project the possible range of future values for your portfolio.</li>
            <li>Information from your Portfolio Overview will be input into the simulation.</li>
            <li>The simulation can take some time to complete.  You can interact with other parts of Fiscal while the simulation runs.</li>
            <li>Press the 'Get Results' button to see if your results are ready yet.</li>
        </ul>        
    `
    let controls = document.createElement("div");
    let message = document.createElement("p");
    let get_button = render_get_results();
    let sim_button = createButton({
        text: "New Simulation",
        type: "btn-success",
        onclickhandler: ()=>{
            modal.renderForm(form_div);
        }
    });
    controls.appendChild(get_button);
    controls.appendChild(sim_button);
    controls.appendChild(message);
    
    interface_items.appendChild(instructions);
    interface_items.appendChild(controls);
    
    container.appendChild(modal);
    container.appendChild(header);
    container.appendChild(interface_items);
    

    return container
}

