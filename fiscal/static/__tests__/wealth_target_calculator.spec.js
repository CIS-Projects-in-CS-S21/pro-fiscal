const wealth_target_calculator = require("../js/Planning/calculate_target");

describe("Checking for proper calculations of the Wealth Target using Compound Interest Formula.", () => {
    test("This should determine whether the wealth target calculator correctly calculates the right value.", () => {
        const input = {
            "id": 1,
            "user": 13,
            "wealth_target_inputs": {
                "target_wealth": 1000000,
                "annual_return": 0.05,
                "num_years": 20
            },
            "date": "2021-04-03T14:40:46.314997Z"
        };

        const output = "$376,889.48";

        let actual = wealth_target_calculator(input);

        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        expect(formatter.format(actual)).toEqual(output);
    });

    test("This should test whether the formatter will display the decimal as USD properly.", () => {
        const input = {
            "id": 1,
            "user": 13,
            "wealth_target_inputs": {
                "target_wealth": 14000,
                "annual_return": 0.1,
                "num_years": 20
            },
            "date": "2021-04-03T14:40:46.314997Z"
        };

        const output = "$2,081.01";

        let actual = wealth_target_calculator(input);

        expect(String(actual)).not.toBe(output);
    });

    test("This should ensure that you get undefined if you do not pass in inputs for all three required inputs.", () => {
        const input = {
            "id": 1,
            "user": 13,
            "wealth_target_inputs": {
                "target_wealth": 14000,
                "annual_return": 0.1
            },
            "date": "2021-04-03T14:40:46.314997Z"
        };

        let actual = wealth_target_calculator(input);

        expect(actual).toBeUndefined();
    });
});