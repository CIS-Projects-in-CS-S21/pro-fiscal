let account_api = {};

/**
 * Function that obtains the user's information.
 * @param {Object} data Username to be sent to request user information.
 * @param {function} successHandler Callback function to handle the data.
 * @param {Node} errorDOM Element where potential error messages will be added to.
 * @returns {boolean} Confirmation status of the operation.
 */
account_api.getUserInfo = function (data, successHandler, errorDOM) {
    let status = false;
    let init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
        body: JSON.stringify(data)
    }

    fetch("/rest-auth/user/", init)
        .then((response) => {
            if (!response.ok) {
                response.text().then(text => { throw Error(text) });
            }
            status = true;
            return response.json();
        }).then(data => {
            successHandler(data);
        }).catch(error => {
            status = false;
            console.error(error);
            errorDOM.innerText = error;
        })

    return status;
}

/**
 * Function that updates the user's username.
 * @param {Object} data Username to be sent to request user information.
 * @param {function} successHandler Callback function to handle the data.
 * @param {Node} errorDOM Element where potential error messages will be added to.
 * @returns {boolean} Confirmation status of the operation.
 */
 account_api.updateUsername = function (data, successHandler, errorDOM) {
    let status = false;
    let init = {
        method: 'PATCH', // Not PUT in this case
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
        body: JSON.stringify(data)
    }

    fetch("/rest-auth/user/", init)
        .then((response) => {
            if (!response.ok) {
                response.text().then(text => { throw Error(text) });
            }
            status = true;
            return response.json();
        }).then(data => {
            successHandler(data);
        }).catch(error => {
            status = false;
            // alert("A username with that username already exists.");
            modal.alert("A username with that username already exists.");
            errorDOM.innerText = error;
        })

    return status;
}

/**
 * Function that allows the user to change their password.
 * @param {Object} data Object containing the new password and a confirmation password to update the user's password.
 * @param {function} successHandler Callback function to handle the data.
 * @param {Node} errorDOM Element where potential error messages will be added to.
 * @returns {boolean} Confirmation status of the operation.
 */
account_api.changePassword = function (data, successHandler, errorDOM) {
    let status = false;
    let init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
        body: JSON.stringify(data)
    }

    fetch("/rest-auth/password/change/", init)
        .then((response) => {
            if (!response.ok) {
                response.text().then(text => { throw Error(text) });
            }
            status = true;
            return response.json();
        }).then(data => {
            successHandler(data);
        }).catch(error => {
            status = false;
            console.error(error);
            errorDOM.innerText = error;
        })

    return status;
}

/**
 * Function that allows the user to reset their password.
 * @param {Object} data Object containing the new password and a confirmation password to update the user's password.
 * @param {function} successHandler Callback function to handle the data.
 * @param {Node} errorDOM Element where potential error messages will be added to.
 * @returns {boolean} Confirmation status of the operation.
 */
account_api.resetPassword = function (data, successHandler, errorDOM) {
    let status = false;
    let init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
        body: JSON.stringify(data)
    }

    fetch("/rest-auth/password/reset/", init)
        .then((response) => {
            if (!response.ok) {
                response.text().then(text => { throw Error(text) });
            }
            status = true;
            return response.json();
        }).then(data => {
            successHandler(data);
        }).catch(error => {
            status = false;
            console.error(error);
            errorDOM.innerText = error;
        })

    return status;
}