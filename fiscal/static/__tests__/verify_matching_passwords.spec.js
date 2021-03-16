const verify_matching_passwords = require("../js/account/register"); /* Should just be the file name that the module is exported from */

describe("Matching Passwords", () => {
    test("It should return true if passwords match.", () => {
        const input1 = "helloWorld";
        const input2 = "helloWorld";

        const output = true;

        expect(verify_matching_passwords(input1, input2)).toEqual(output);
    });

    test("It should return false if passwords do not match.", () => {
        const input1 = "helloWorld";
        const input2 = "goodbye";

        const output = false;

        expect(verify_matching_passwords(input1, input2)).toEqual(output);
    })
});