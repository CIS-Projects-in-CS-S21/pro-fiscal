/**
 * Function that verifies whether the inputted passwords match.
 * @param {string} password The password the user wants to use for their account.
 * @param {string} password_verify A password string that helps the user confirms their password choice.
 * @returns {boolean} Compares whether password and password_verify are equal.
 */
 function verify_matching_passwords (password, password_verify) {
    return password === password_verify;
}