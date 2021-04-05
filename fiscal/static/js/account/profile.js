/**
 * Function that attempts to update the user's account credentials.
 * @param {string} email The new email the account the user wants to update their account to.
 * @param {string} password The password the user wants to update for their account.
 * @returns {boolean} Verifies whether the inputted email is in the database.
 */
function update_user_credentials(email, password) {

}

/**
 * Function that attempts to update the user's security questions and answers.
 * @param {Array} questions A series of questions the user wants to use for their security questions.
 * @param {Array} answers A series of answers for the user's security questions.
 * @returns {string} Confirmation message via a Success message dependent on the operation.
 * @throws Will throw an error if either the questions or the answers arrays contain null, NaN, etc.
 * @throws If the length of the questions and the answers arrays are not matching.
 */
function update_security_questions(questions, answers) {

}

/**
 * Function that toggles the advanced setting on and off.
 * @returns {boolean} Returns the status of the advanced setting.
 */
function toggle_advanced_setting() {

}

function userProfile() {

    function renderUpdatePasswordForm(saveFunc, cancelFunc) {
        let form = {};

        form.container = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = "Update Password";
        title.classList.add("text-center");

        let label_password1 = document.createElement("label");
        label_password1.innerText = "Password";
        form.new_password1 = document.createElement('input');
        form.new_password1.type = 'text';
        form.new_password1.classList.add("form-control");

        let label_password2 = document.createElement("label");
        label_password2.innerText = "Confirm Password";
        form.new_password2 = document.createElement('input');
        form.new_password2.type = 'text';
        form.new_password2.classList.add("form-control");

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("d-flex");

        let buttonGroupSubmit = document.createElement("div");
        buttonGroupSubmit.classList.add("btn-group", "mr-auto");

        let buttonGroupCancel = document.createElement("div");
        buttonGroupCancel.classList.add("btn-group", "ml-auto");

        form.submit = createButton({
            type: "btn-success",
            text: "Submit",
            onclickhandler: saveFunc
        });

        form.submit.classList.add("mr-2");

        let cancel = createButton({
            type: "btn-danger",
            text: "Cancel",
            onclickhandler: cancelFunc
        });

        cancel.classList.add("mr-2");

        form.container.appendChild(title);
        form.container.appendChild(label_password1);
        form.container.appendChild(form.new_password1);
        form.container.appendChild(label_password2);
        form.container.appendChild(form.new_password2);
        form.container.appendChild(document.createElement("br"));

        buttonGroupSubmit.appendChild(form.submit);
        buttonGroupCancel.appendChild(cancel);

        buttonDiv.appendChild(buttonGroupSubmit);
        buttonDiv.appendChild(buttonGroupCancel);

        form.container.appendChild(buttonDiv);

        return form;
    }

    function renderUpdateUsernameForm(saveFunc, cancelFunc) {
        let form = {};

        form.container = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = "Update your Username";
        title.classList.add("text-center");

        let label_old_username = document.createElement("label");
        label_old_username.innerText = "Your previous Username";
        form.old_username = document.createElement('input');
        form.old_username.type = 'text';
        form.old_username.classList.add("form-control");
        form.old_username.value = localStorage.getItem("username");
        form.old_username.disabled = true;

        let new_username = document.createElement("label");
        new_username.innerText = "New Username";
        form.new_username = document.createElement('input');
        form.new_username.type = 'text';
        form.new_username.classList.add("form-control");

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("d-flex");

        let buttonGroupSubmit = document.createElement("div");
        buttonGroupSubmit.classList.add("btn-group", "mr-auto");

        let buttonGroupCancel = document.createElement("div");
        buttonGroupCancel.classList.add("btn-group", "ml-auto");

        form.submit = createButton({
            type: "btn-success",
            text: "Submit",
            onclickhandler: saveFunc
        });

        form.submit.classList.add("mr-2");

        let cancel = createButton({
            type: "btn-danger",
            text: "Cancel",
            onclickhandler: cancelFunc
        });

        cancel.classList.add("mr-2");

        form.container.appendChild(title);
        form.container.appendChild(label_old_username);
        form.container.appendChild(form.old_username);
        form.container.appendChild(new_username);
        form.container.appendChild(form.new_username);
        form.container.appendChild(document.createElement("br"));

        buttonGroupSubmit.appendChild(form.submit);
        buttonGroupCancel.appendChild(cancel);

        buttonDiv.appendChild(buttonGroupSubmit);
        buttonDiv.appendChild(buttonGroupCancel);

        form.container.appendChild(buttonDiv);

        return form;
    }

    let profileDiv = document.createElement("div");

    let username = localStorage.getItem("username");

    let header = document.createElement("h3");
    header.innerHTML = "Profile for User <strong>" + username + "</strong>";

    let dashboard = document.createElement("div");
    dashboard.classList.add("dashboard");

    let accountDateHolder = document.createElement("p");
    accountDateHolder.innerText = "Created Account on (Date)";

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("d-flex");

    let buttonGroupUsername = document.createElement("div");
    let buttonGroupPassword = document.createElement("div");
    
    let updateUsernameButton = createButton({
        type: "btn-secondary",
        text: "Update your Username"
    });

    let updatePasswordButton = createButton({
        type: "btn-info",
        text: "Update your Password"
    });

    updateUsernameButton.addEventListener("click", function () {
        let form = renderUpdateUsernameForm(function () {
            modal.hideModal();
            console.log("Hello World");
        }, function () {
            modal.hideModal();
        });

        modal.renderForm(form.container);
    });

    updatePasswordButton.addEventListener("click", function () {
        let form = renderUpdatePasswordForm(function () {
            modal.hideModal();
            console.log("Hello World");
        }, function () {
            modal.hideModal();
        });

        modal.renderForm(form.container);
    });

    buttonGroupUsername.classList.add("btn-group", "ml-auto", "mr-auto");
    buttonGroupPassword.classList.add("btn-group", "ml-auto", "mr-auto");

    dashboard.appendChild(header);
    dashboard.appendChild(accountDateHolder);

    profileDiv.appendChild(modal);
    profileDiv.appendChild(dashboard);

    buttonGroupUsername.appendChild(updateUsernameButton);
    buttonGroupPassword.appendChild(updatePasswordButton);

    buttonDiv.appendChild(buttonGroupUsername);
    buttonDiv.appendChild(buttonGroupPassword);
    
    profileDiv.appendChild(buttonDiv);

    return profileDiv;
}