let portfolio_api = {};

/**
 * @param {function} successHandler callback function to handle the data
 * @param {Node} error_elem the element to add a useful error message to
 * @returns {boolean} confirmation status
 * @throws {InvalidArgumentException} if the user enters invalid id or account name.
 */
portfolio_api.get_all_portfolios = function (successHandler, error_elem) {
    let status = false;
    let init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        }
    }
    fetch("/planning/portfolio/", init)
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
            error_elem.innerText = error;
        })

    return status;
}

/**
 * Function that return user a single portfolio.
 * @param {int} portfolio_id the user identification number
 * @throws {InvalidArgumentException} when the user enter no value id.
 * @returns {Array} arrays of portfolios
 */
portfolio_api.get_portfolio = function (portfolio_id) {
    let init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
    }

    fetch("/planning/portfolio/" + portfolio_id, init)
        .then(response => {
            console.log(response);
            return response.json();
        }).catch((error) => {
            console.error(error);
        });

    return portfolio;
}

/**
 * Function that creates user portfolio account.
 * @param {Object} data the data sent to the creation API
 * @param {function} successHandler callback function to handle the data
 * @param {Node} error_elem the element to add a useful error message to
 * @returns {boolean} confirmation status
 * @throws {InvalidArgumentException} if the user enters invalid data.
 */
portfolio_api.create_portfolio = function (data, successHandler, error_elem) {
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

    fetch("/planning/portfolio/", init)
        .then((response) => {
            if (!response.ok) {
                throw new Error("" + response.statusText)
            }
            status = true
            return response.json();
        }).then((data) => {
            successHandler(data);
        }
        ).catch(error => {
            status = false
            error_elem.innerText = error;
        })

    return status;
}

/**
 * Function that updates the user portfolio.
 * @param {Object} data the data sent to the creation API
 * @param {function} successHandler callback function to handle the data
 * @param {Node} error_elem the element to add a useful error message to
 * @throws {InvalidArgumentException} if the user enters invalid data.
 */
portfolio_api.update_portfolio = function (data, successHandler, error_elem) {
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

    fetch("/planning/portfolio/" + data["id"], init)
        .then((response) => {
            if (!response.ok) {
                throw new Error("" + response.statusText)
            }
            status = true
            return response.json();
        }).then((data) => {
            console.log(data);
            successHandler(data);
        }
        ).catch(error => {
            status = false
            error_elem.innerText = error;
        })

    return status;
}

/**
 * Function that deletes the user portfolio.
 * @param {int} portfolio_id the portfolio identification number.
 * @param {Node} error_elem the element to add a useful errror message to.
 * @returns {boolean} Returns confirmation status.
 * @throws {InvalidArgumentException} if the user enters no value id.
 */
portfolio_api.delete_portfolio = function (portfolio_id, successHandler, error_elem) {
    let status = false;
    let init = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
    }

    fetch("/planning/portfolio/" + portfolio_id, init)
        .then((response) => {
            if (!response.ok) {
                throw new Error("" + response.statusText)
            }
            status = true;
        }).then(() => {
            successHandler()
        }
        ).catch(error => {
            status = false;
            error_elem.innerText = error;
        })

    return status;
}

/**
 * Function that adds the value to the user portfolio account.
 * @param {Object} data the data sent to the creation API
 * @param {function} successHandler callback function to handle the data
 * @param {Node} error_elem the element to add a useful error message to
 * @returns {boolean} Returns confirmation status.
 * @throws {InvalidArgumentException} if the user add no value or -ve value.
 */
portfolio_api.add_holding = function (data, successHandler, error_elem) {
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

    fetch("/planning/holding/", init)
        .then((response) => {
            if (!response.ok) {
                console.log(response);
                throw new Error("" + response.statusText)
            }
            status = true
            return response.json();
        }).then((data) => {
            successHandler(data);
        }
        ).catch(error => {
            status = false
            error_elem.innerText = error;
        })

    return status;
}

/**
 * Function that updates the holding data
 * @param {Object} data the data sent to the update API
 * @param {function} successHandler callback function to handle the data
 * @param {Node} error_elem the element to add a useful error message to
 * @returns {boolean} Returns confirmation status.
 * @throws {InvalidArgumentException} if the user enters wrong portfolio id.
 */
portfolio_api.update_holding = function (data, successHandler, error_elem) {
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

    fetch("/planning/holding/" + data["id"], init)
        .then((response) => {
            if (!response.ok) {
                throw new Error("" + response.statusText)
            }
            status = true
            return response.json();
        }).then((data) => {
            successHandler(data);
        }
        ).catch(error => {
            status = false
            error_elem.innerText = error;
        })

    return status;
}


/**
 * Function that deletes the holding
 * @param {int} the primary key of the holding to delete
 * @param {function} successHandler callback function to handle the data
 * @param {Node} error_elem the element to add a useful error message to
 * @returns {boolean} Returns confirmation status.
 * @throws {InvalidArgumentException} if portfolio is invalid.
 */
portfolio_api.delete_holding = function (holding_id, successHandler, error_elem) {
    let status = false;
    let init = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        },
    }

    fetch("/planning/holding/" + holding_id, init)
        .then((response) => {
            if (!response.ok) {
                throw new Error("" + response.statusText)
            }
            status = true;
        }).then(() => {
            successHandler()
        }
        ).catch(error => {
            status = false;
            error_elem.innerText = error;
        })

    return status;
};