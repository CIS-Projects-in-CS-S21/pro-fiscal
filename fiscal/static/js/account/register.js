/**
 * Renders the registration component of the website.
 * @returns {HTMLDivElement} A form that the user can input their credentials to register.
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