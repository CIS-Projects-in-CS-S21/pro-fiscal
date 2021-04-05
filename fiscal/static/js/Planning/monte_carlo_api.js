let monte_api = {};

/**
 * Function that calls the monte carlo API and requests a simulation initiation
 * @param {object} input_data An object with the input members for the API
 * @returns {Promise} response
 * @throws {Error} if the response contains an failure status.
 */
monte_api.start_sim = function(input_data){
    let init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        }
    }

    // Return the response rather than response.json()
    // because API gives different success statuses that must be handled
    return fetch("/monte-carlo/", init)
}

/**
 * Function that calls the monte carlo API and requests the simulation results
 * @returns {Promise} response
 * @throws {Error} if the response contains an failure status.
 */
monte_api.get_results = function(){
    let init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        }
    }

    // Return the response rather than response.json()
    // because API gives different success statuses that must be handled
    return fetch("/monte-carlo/", init)
}