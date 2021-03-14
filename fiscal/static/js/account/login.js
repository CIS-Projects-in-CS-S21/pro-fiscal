/**
 * Function that attempts to find if a user with the associated email exists.
 * @param {string} email The email associated with the account the user wants to obtain account information.
 * @returns {boolean} Verifies whether the inputted email is in the database.
 */
function find_user_by_email (email) {
    
}

/**
 * Function that given a user's credentials, attempts to login.
 * @param {string} email The email associated with the account the user wants to log into.
 * @param {string} password The password associated with the account the user wants to log into.
 * @returns {boolean} Determines whether or not the user is able to access the account in question.
 */
function match_passwords (email, password) {
    
}

/**
 * Function that displays the input form for the user to login.
 * @returns {Form} A form that the user can input their credentials to login.
 */
function loginInterface() {

}

/**
 * Function that signs the user out.
 * @returns {string} A confirmation message is returned stating that the user has logged out.
 */
function logoutInterface() {
    var message = document.createElement("div");
    var button = document.createElement("button");
    button.innerHTML = "Log Out";
    button.onclick = logout
    message.appendChild(button);
    message.classList.add("logout");

    return message;

    function logout(){
        console.log("Logging out user")
        postLogout().then(resp =>{
            console.log(resp)
            document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
            if(resp.ok) {
                message.innerHTML = "Successfully Logged Out"
            }
            else{
                message.innerHTML = "Unable to Log Out"
            }
        });
    }

    async function postLogout(){
        let url = "/rest-auth/logout/"
        const response = fetch(url, {
            method: "post"
        });
        return response
    }


}