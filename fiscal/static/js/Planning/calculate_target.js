function wealth_target_calculate(params) {
    let target_wealth = params.wealth_target_inputs.target_wealth;
    let annual_return = params.wealth_target_inputs.annual_return;
    let num_years = params.wealth_target_inputs.num_years;

    if (target_wealth === undefined || annual_return === undefined || num_years === undefined) {
        return undefined;
    }

    const finalValue = target_wealth / ((1 + annual_return) ** num_years);

    return finalValue;
}

// module.exports = wealth_target_calculate;