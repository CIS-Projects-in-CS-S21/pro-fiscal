/**
 * Function that displays the input form for the user to login.
 * @returns {HTMLDivElement} A form that the user can input their credentials to login.
 */
function loginInterface() {
    let content = `
         <p class="form-style">FISCAL</p>

        <form id="basic-form">

            <user-form class="user-login-form">
                <p id="general_error" class="error"></p>
                <input type="text" placeholder="username"/><span id="username" class="error"></span>                
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
 * @returns {HTMLHeadingElement} A confirmation message is returned stating that the user has logged out.
 */
function logoutInterface() {

    function logout() {
        console.log("Logging out user");
        postLogout().then(resp => {
            console.log(resp)
            localStorage.removeItem("key")
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