const days_after_update = require("../js/days_after_update");

describe("Checking for days after", () => {
    test("It should return 2 days in between April 1st and April 3rd.", () => {
        const input1 = new Date("04-01-2021");
        const input2 = new Date("04-03-2021");

        const output = 2;

        expect(days_after_update(input2, input1)).toEqual(output);
    });

    test("It should return 0 days in between April 1st 6 PM and April 1st 8 PM.", () => {
        const input1 = new Date(2021, 3, 1, 18);
        const input2 = new Date(2021, 3, 1, 20);

        const output = 0;

        expect(days_after_update(input2, input1)).toEqual(output);
    })
});