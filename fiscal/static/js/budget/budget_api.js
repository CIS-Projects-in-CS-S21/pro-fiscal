let budget_api = {};

/**
 * Function that fetches expense items from the database based on the currently logged in user.
 * @param {int} user_id ID of the user.
 * @throws {InvalidArgumentException} If user_id is NaN, null, etc.
 * @returns {Array} Collection of budget items associated with the user.
 */
budget_api.getAllExpenseItems = function (successHandler, errorDOM) {
    let status = false;
    let init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        }
    }
    fetch("/expense/expense/", init)
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
 * @param {*} data
 * @param {*} successHandler
 * @param {*} errorDOM
 * @throws {InvalidArgumentException} If any params is NaN, null, etc.
 * @returns {boolean} Returns a status for the API create function.
 */
budget_api.createExpenseItem = function (data, successHandler, errorDOM) {
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

    fetch("/expense/expense/", init)
        .then((response) => {

            if (!response.ok) {
                response.text().then(text => { throw Error(text) });
            }

            status = true;
            return response.json();
        }).then((data) => {
            successHandler(data);
        }
        ).catch(error => {
            status = false;
            console.error(error);
            errorDOM.innerText = error;
        })

    return status;
}


/**
 * @param {*} data
 * @param {*} successHandler
 * @param {*} errorDOM
 * @throws {InvalidArgumentException} If any params is NaN, null, etc.
 * @returns {boolean} Returns a status for the API update function.
 */
budget_api.updateExpenseItem = function (data, successHandler, errorDOM) {
    let status = false;
    let init = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
        body: JSON.stringify(data)
    }

    // console.log(data);

    fetch("/expense/expense/" + data["id"], init)
        .then((response) => {

            if (!response.ok) {
                response.text().then(text => { throw Error(text) });
            }

            status = true;
            return response.json();
        }).then((data) => {
            successHandler(data);
        }
        ).catch(error => {
            status = false;
            errorDOM.innerText = error;
        })

    return status;
}

/**
 * @param {*} data
 * @param {*} successHandler
 * @param {*} errorDOM
 * @throws {InvalidArgumentException} If any params is NaN, null, etc.
 * @returns {boolean} Returns a status for the API delete function.
 */
budget_api.deleteExpenseItem = function (expense_id, successHandler, errorDOM) {
    let status = false;
    let init = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
    }

    fetch("/expense/expense/" + expense_id, init)
        .then((response) => {

            if (!response.ok) {
                response.text().then(text => { throw Error(text) });
                // throw new Error("" + response.statusText)
            }

            status = true;
        }).then(() => {
            successHandler();
        }
        ).catch(error => {
            status = false;
            errorDOM.innerText = error;
        })

    return status;
}