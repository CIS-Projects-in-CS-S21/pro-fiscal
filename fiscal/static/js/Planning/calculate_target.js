/**
 * 
 * @param {JSON} params Object that contains three separate values used to calculate the present value the user wants so
 * that they can attain the desired future value.
 * @throws Will throw an error if any param values taken are undefined, NaN, negative, etc.
 * @returns {float} Denotes the present value required to attain future value.
 */
function wealth_target_calculate(params) {
    let target_wealth = params.wealth_target_inputs.target_wealth;
    let annual_return = params.wealth_target_inputs.annual_return;
    let num_years = params.wealth_target_inputs.num_years;

    if (target_wealth === undefined || annual_return === undefined || num_years === undefined) { // Missing parameters
        return undefined;
    } else if (isNaN(target_wealth) || isNaN(annual_return) || isNaN(num_years)) { // Nonzero Inputs
        return null;
    } else if (currencyValidation(target_wealth) === null) { // Avoid too many decimal places
        return null;
    } else if (target_wealth < 0 || annual_return < 0 || num_years < 0) { // Handles divide by 0 and negative number inputs
        return null;
    }

    const finalValue = target_wealth / ((1 + (annual_return / 100)) ** num_years);

    return finalValue;
}
// module.exports = wealth_target_calculate;