/**
 * Function that given a user's credentials, create a new account.
 * @param {string} email The email that the user will use to create a new account.
 * @param {string} password The password the user wants to use for their account.
 * @param {string} password_verify A password string that helps the user confirms their password choice.
 * @returns {Promise} Promise object represents the status of the account.
 * @throws Will throw an error if at least one of the arguments are null.
 * @throws Will throw an error if account could not be created.
 */
function create_new_account (email, password, password_verify) {
    
}

/**
 * Function that verifies whether the inputted passwords match.
 * @param {string} password The password the user wants to use for their account.
 * @param {string} password_verify A password string that helps the user confirms their password choice.
 * @returns {boolean} Compares whether password and password_verify are equal.
 */
function verify_matching_passwords (password, password_verify) {
    return password === password_verify;
}

/**
 * Function that handles the creation of security questions associated with the registration.
 * @param {Array} questions A series of questions the user wants to use for their security questions.
 * @param {Array} answers A series of answers for the user's security questions.
 * @returns {string} Confirmation message of entering in proper security question and answer pairings.
 * @throws Will throw an error if either the questions or the answers arrays contain null, NaN, etc.
 * @throws If the length of the questions and the answers arrays are not matching.
 */
function create_security_questions (questions, answers) {
    
}

/**
 * Renders the registration component of the website.
 */
function register () {
    const content = ` <p class="form-style">FISCAL</p> <form id="basic-form">
        <user-form class="user-registration-form">
            <p id="general_error" class="error"></p>
            <input type="text" placeholder="username"/><span id="username" class="error"></span>
            <input type="text" placeholder="email"/><span id="email" class="error"></span>
            <input type="password" placeholder="password"/><span id="password1" class="error"></span>
            <input type="password" placeholder="Confirm password"/><span id="password2" class="error"></span>
            <button>Create</button>
            <p class="message to-login">Already have an account? <span class="link">Login</span> </p>
        </user-form>
        </form>`;

    let elem = document.createElement("div");
    elem.innerHTML = content;
    return elem;
}

// module.exports = verify_matching_passwords;