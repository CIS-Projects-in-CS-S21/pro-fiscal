/**
 * Function that given a user's credentials, create a new account.
 * @param {string} email The email that the user will use to create a new account.
 * @param {string} password The password the user wants to use for their account.
 * @param {string} password_verify A password string that helps the user confirms their password choice.
 * @returns {Promise} Promise object represents the status of the account.
 * @throws Will throw an error if at least one of the arguments are null.
 * @throws Will throw an error if account could not be created.
 */
function create_new_account(email, password, password_verify) {

}

/**
 * Function that verifies whether the inputted passwords match.
 * @param {string} password The password the user wants to use for their account.
 * @param {string} password_verify A password string that helps the user confirms their password choice.
 * @returns {boolean} Compares whether password and password_verify are equal.
 */
function verify_matching_passwords(password, password_verify) {

}

/**
 * Function that handles the creation of security questions associated with the registration.
 * @param {Array} questions A series of questions the user wants to use for their security questions.
 * @param {Array} answers A series of answers for the user's security questions.
 * @returns {string} Confirmation message of entering in proper security question and answer pairings.
 * @throws Will throw an error if either the questions or the answers arrays contain null, NaN, etc.
 * @throws If the length of the questions and the answers arrays are not matching.
 */
function create_security_questions(questions, answers) {

}

/**
 * Renders the registration component of the website.
 */
function register() {

    async function loginAttempt(data) {
        let url = "/rest-auth/login/";

        const response = fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return (await response).json();
    }

    function logIn() {

        let data = {
            "username": "chris",
            "email": "tuc48712@temple.edu",
            "password": "fiscal-project"
        };

        loginAttempt(data).then(resp => {
            console.log(resp);
            if (resp["key"] !== null) {
                message.innerText = "Welcome " + data.username;
                // Change hash location to Home
            }
        });
    }

    let message = document.createElement("div");
    let button = document.createElement("button");
    button.innerText = "Login";
    button.onclick = logIn;
    message.appendChild(button);
    message.classList.add("login");

    return message;
}