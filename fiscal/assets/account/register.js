/**
 * Function that given a user's credentials, create a new account.
 * @param {string} username
 * @param {string} password
 * @param {string} password_verify
 * @returns {Promise} Promise object represents the status of the account.
 * @throws Will throw an error if at least one of the arguments are null.
 * @throws Will throw an error if account could not be created.
 */
function create_new_account (username, password, password_verify) {
    
}

/**
 * Function that verifies whether the inputted passwords match.
 * @param {string} password
 * @param {string} password_verify
 * @returns {boolean} Compares whether password and password_verify are equal.
 */
function verify_matching_passwords (password, password_verify) {
    
}

/**
 * Function that handles the creation of security questions associated with the registration.
 * @param {Array} questions
 * @param {Array} answers
 * @returns {string} Confirmation message of entering in proper security question and answer pairings.
 * @throws Will throw an error if either the questions or the answers arrays contain null, NaN, etc.
 * @throws If the length of the questions and the answers arrays are not matching.
 */
function create_security_questions (questions, answers) {
    
}