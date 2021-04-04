/**
 * Function that attempts to find if a user with the associated email exists.
 * @param {string} email The email associated with the account the user wants to obtain account information.
 * @returns {boolean} Verifies whether the inputted email is in the database.
 */
function find_user_by_email(email) {

}

/**
 * Function that given a user's credentials, attempts to login.
 * @param {string} email The email associated with the account the user wants to log into.
 * @param {string} password The password associated with the account the user wants to log into.
 * @returns {boolean} Determines whether or not the user is able to access the account in question.
 */
function match_passwords(email, password) {

}

/**
 * Function that displays the input form for the user to login.
 * @returns {Form} A form that the user can input their credentials to login.
 */
function loginInterface() {
    let content = `
         <p class="form-style">FISCAL</p>

        <form id="basic-form">

            <user-form class="user-login-form">
                <p id="general_error" class="error"></p>
                <input type="text" placeholder="username"/><span id="username" class="error"></span>
                <input type="text" placeholder="email"/><span id="email" class="error"></span>
                <input type="password" placeholder="password"/><span id="password" class="error"></span>
                <button>Login</button>
                <p class="No-password">Forgot Password ?</p>
                
                <p class="message to-register">Don't have an account? <span class="link">Create Account<span> </p>
            </user-form>
        </form>
    `;


    let elem = document.createElement("div");
    elem.innerHTML = content;
    return elem;

}

/**
 * Function that logs the user out and renders an interface that confirms that the user logged out.
 * @returns {Element} A confirmation message is returned stating that the user has logged out.
 */
function logoutInterface() {

    function logout() {
        console.log("Logging out user");
        postLogout().then(resp => {
            console.log(resp)
            localStorage.removeItem("key")
            localStorage.removeItem("username");
            window.location.replace("/")
        });
    }

    async function postLogout() {
        let url = "/rest-auth/logout/";
        const response = fetch(url, {
            method: "post"
        });
        return response;
    }

    let message = document.createElement("h2");

    message.innerText = "Logging out...";
    logout();

    return message;

}