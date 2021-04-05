/**
 * Function stores the collection of forecast data and provide the visualization of the range of future values output.
 * @param {Array} forecast_data The data that will be used to render potential future value rates for the output.
 * @throws {InvalidArgumentException} if the value is null.
 * @returns {Array} Return arrays of future value.
 */
function render_future_value (forecast_data) {

    const inputNames = [
    {inputText :"Enter the amount that you need to withdrawn in each month: ", inputId : "AnnualDeposit"},
    {inputText : "Enter the amount that you need to add to saving until retirement: ",inputId : "incomeToBeWithdrawn"},
    {inputText:"Enter you assumption for the future value of inflation rate: ",inputId : "inflation"},
    {inputText : "Enter the number of years that you left for the retirement: ", inputId : "Years"}
    ]

    const stockBondOption = ["30% Bonds, 70% Stocks","40% Bonds, 60% Stocks", "50% Bonds, 50%Stocks","60% Bonds, 40% Stocks","70% Bonds, 30% Stocks"];


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
    stockBondOption.forEach(stockBond =>{
        const option = document.createElement("option");
        option.value = stockBond;
        option.innerHTML = stockBond;
        selectStockBond.appendChild(option);
    })
    selectStockBond.selectedIndex = 0;

    simulationDiv.appendChild(stockBondLabel);
    simulationDiv.appendChild(selectStockBond);

    inputNames.forEach(input =>{
        const label = document.createTextNode(input.inputText);
        const actualInput = document.createElement("input");
        actualInput.id = input.inputId;
        simulationDiv.appendChild(label);
        simulationDiv.appendChild(actualInput);
    })

    const submitButton = document.createElement("button");
    submitButton.id = "submitInfo";
    submitButton.innerHTML = "Submit";
    simulationDiv.appendChild(submitButton);

    userData.appendChild(simulationDiv);

    elem.appendChild(userData);
    return elem;
}

/**
 * Function that give a collection of future value of data.
 * @param {Array} forecast_data The data that will be used to render potential future value rates for the output.
 * @returns {Array} Return a collection of forecast amount of data.
 * @throws {InvalidArgumentException} if the value of data is null.
 */
function future_value_chart (forecast_data) {
}
