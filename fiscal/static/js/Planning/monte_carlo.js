/**
 * Function stores the collection of forecast data and provide the visualization of the range of future values output.
 * @param {Array} forecast_data The data that will be used to render potential future value rates for the output.
 * @throws {InvalidArgumentException} if the value is null.
 * @returns {Array} Return arrays of future value.
 */
function render_future_value (forecast_data) {
let content = `
         <p class="form-style">Monte Carlo Simulation</p>

         <user-data class="user-inputs">
        <div id="simulation">
        Enter the amount that you need to withdrawn in each month: <input id="AnnualDeposit" type="number">
        Enter the amount that you need to add to saving until retirement : <input id="incomeToBeWithdrawn" type="number">
        Enter your assumption for the future value of inflation rate: <input id="inflation" type="number">
        Enter the number of years that you left for the retirement: <input id="Years" type="number">

          <button id="submitInfo">Submit</button>
    </div>
     </user-data>


    `;


    let elem = document.createElement("div");
    elem.innerHTML = content;
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
