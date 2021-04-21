/**
 * Function that renders the user profile component.
 * @returns {HTMLDivElement} A DOM Element that represents the page for the user profile.
 */
function userProfile() {

    /**
     * Function that creates the form used to update a user's password.
     * @param {function} saveFunc Function that handles the submission of a form.
     * @param {function} cancelFunc Function that handles the cancel action of a form.
     * @returns {HTMLDivElement} The form to be rendered to the user.
     */
    function renderUpdatePasswordForm(saveFunc, cancelFunc) {
        let form = {};

        form.container = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = "Update Password";
        title.classList.add("text-center");

        let label_old_password = document.createElement("label");
        label_old_password.innerText = "Old Password";
        form.old_password = document.createElement('input');
        form.old_password.type = 'password';
        form.old_password.classList.add("form-control");

        let label_password1 = document.createElement("label");
        label_password1.innerText = "Password";
        form.new_password1 = document.createElement('input');
        form.new_password1.type = 'password';
        form.new_password1.classList.add("form-control");

        let label_password2 = document.createElement("label");
        label_password2.innerText = "Confirm Password";
        form.new_password2 = document.createElement('input');
        form.new_password2.type = 'password';
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
        form.container.appendChild(label_old_password);
        form.container.appendChild(form.old_password);
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

    /**
     * Function that creates the form used to update a user's username.
     * @param {function} saveFunc Function that handles the submission of a form.
     * @param {function} cancelFunc Function that handles the cancel action of a form.
     * @returns {HTMLDivElement} The form to be rendered to the user.
     */
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
        form.old_username.value = username;
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

    /**
     * Function that renders a dashboard showing the user their username, and when they created their account.
     * @returns {HTMLDivElement} A DOM Element used to render information about the user.
     */
    function createDashboard() {
        let dashboard = document.createElement("div");
        dashboard.classList.add("dashboard");

        let header = document.createElement("h3");
        header.innerHTML = "Profile for User <strong>" + username + "</strong>";

        let accountDateHolder = document.createElement("p");
        accountDateHolder.innerText = "Created Account on " + accountCreationDate;

        dashboard.appendChild(header);
        dashboard.appendChild(accountDateHolder);

        return dashboard;
    }

    /**
     * Function that renders the components of the profile page.
     */
    function render() {
        let dashboard = createDashboard();

        /* Button Components */
        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("d-flex");

        let buttonGroupUsername = document.createElement("div");
        let buttonGroupPassword = document.createElement("div");

        buttonGroupUsername.classList.add("btn-group", "ml-auto", "mr-auto");
        buttonGroupPassword.classList.add("btn-group", "ml-auto", "mr-auto");

        let updateUsernameButton = createButton({
            type: "btn-secondary",
            text: "Update your Username"
        });

        let updatePasswordButton = createButton({
            type: "btn-info",
            text: "Update your Password"
        });

        updateUsernameButton.addEventListener("click", function () {
            const successFunc = (confirm) => {
                modal.hideModal();
                modal.alert("Your username has been changed.");
                profileDiv.innerHTML = '';
                account_api.getUserInfo(handleProfileInfo, errorDOM);
            };

            let form = renderUpdateUsernameForm(function () {
                let data = {};
                let errors = [];

                let oldName = form.old_username.value;
                data["username"] = form.new_username.value;

                if (form.new_username.value === undefined || form.new_username.value === '') {
                    let errorMsg = "Please enter a username.";
                    errors.push(errorMsg);
                } else {
                    if (oldName === form.new_username.value) {
                        let errorMsg = "Please try to be original here. This is already your username.";
                        errors.push(errorMsg);
                    } else {
                        if (form.new_username.value.length > 150) {
                            let errorMsg = "Too many characters. Keep it to 150 characters or less.";
                            errors.push(errorMsg);
                        }

                        if (usernameValidation(form.new_username.value) === null) {
                            let errorMsg = "Your username can only contain the following: Letters, Digits, and @, ., +, -, _";
                            errors.push(errorMsg);
                        }
                    }
                }

                if (errors.length === 0) {
                    account_api.updateUsername(data, successFunc, errorDOM);
                } else {
                    modal.renderErrorMessages(errors);
                }
            }, function () {
                modal.hideModal();
            });

            modal.renderForm(form.container);
        });

        updatePasswordButton.addEventListener("click", function () {
            const successFunc = (confirm) => {
                modal.hideModal();
                modal.alert("Your password has changed.");
            };

            let form = renderUpdatePasswordForm(function () {
                let data = {};
                let errors = [];

                data["old_password"] = form.old_password.value;
                data["new_password1"] = form.new_password1.value;
                data["new_password2"] = form.new_password2.value;

                if (form.old_password.value === undefined || form.old_password.value === '') {
                    let errorMsg = "Please enter your previous password here.";
                    errors.push(errorMsg);
                }

                if (form.new_password1.value === undefined || form.new_password1.value === '') {
                    let errorMsg = "Enter a password for Password 1.";
                    errors.push(errorMsg);
                } else if (form.new_password2.value === undefined || form.new_password2.value === '') {
                    let errorMsg = "Enter a password for Password 2.";
                    errors.push(errorMsg);
                } else {
                    if (!verify_matching_passwords(form.new_password1.value, form.new_password2.value)) {
                        let errorMsg = "The passwords do not match.";
                        errors.push(errorMsg);
                    } else {
                        if (form.new_password1.value.length < 8) {
                            let errorMsg = "This password is too short. It must contain at least 8 characters.";
                            errors.push(errorMsg);
                        }

                        if (!isNaN(form.new_password1.value)) {
                            let errorMsg = "This password is entirely numeric.";
                            errors.push(errorMsg);
                        }
                    }
                }

                if (errors.length === 0) {
                    account_api.changePassword(data, successFunc, errorDOM);
                } else {
                    modal.renderErrorMessages(errors);
                }
            }, function () {
                modal.hideModal();
            });

            modal.renderForm(form.container);
        });

        buttonGroupUsername.appendChild(updateUsernameButton);
        buttonGroupPassword.appendChild(updatePasswordButton);

        buttonDiv.appendChild(buttonGroupUsername);
        buttonDiv.appendChild(buttonGroupPassword);

        profileDiv.appendChild(modal);
        profileDiv.appendChild(errorDOM);
        profileDiv.appendChild(dashboard);
        profileDiv.appendChild(buttonDiv);
    }

    /* Function that handles the user's account data and formats them in a meaningful fashion. */
    const handleProfileInfo = (data) => {
        username = data['username'];
        accountCreationDate = moment(data['date_joined']).format('MMMM Do, YYYY');
        render();
    };

    let profileDiv = document.createElement("div");
    let errorDOM = document.createElement("div");

    account_api.getUserInfo(handleProfileInfo, errorDOM);

    let username = '';
    let accountCreationDate = '';

    return profileDiv;
}