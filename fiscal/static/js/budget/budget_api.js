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
                throw new Error("" + response.statusText)
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