/**
 * Function that return user portfolios
 * @param {array} user_id the user identification number
 * @throws {InvalidArgumentException} when the user enter no value id.
 * @returns {Array} arrays of portfolios
 */
function get_portfolios (user_id) {

}

/**
 * Function that creates user portfolio account.
 * @param {int} user_id the user identification number
 * @param {String} account name the user is known or referred to that account
 * @returns {boolean} confirmation status
 * @throws {InvalidArgumentException} if the user enters invalid id or account name.
 */
function create_portfolio (user_id, account_name) {

}

/**
 * Function that updates the user portfolio.
 * @param {int} portfolio_id the user identification number
 * @param {String} account_name the user is known or referred to that account
 * @returns {object} return user account information to make changes and update
 * @throws {InvalidArgumentException} if the user enters no value id or account name.
 */
function update_portfolio (portfolio_id, account_name) {

}

/**
 * Function that deletes the user portfolio.
 * @param {int} portfolio_id the user identification number
 * @returns {boolean} Returns confirmation status
 * @throws {InvalidArgumentException} if the user enters no value id.
 */

function delete_portfolio (portfolio_id) {

}

/**
 * Function that adds the value to the user portfolio account.
 * @param {int} portfolio_id the user identification number
 * @param {int} amount value of loss or an asset
 * @returns {}
 * @throws {InvalidArgumentException} if the user add no value or -ve value
 */
function add_holding (portfolio_id, amount) {

}

/**
 * Function that updates the holding balance of the user.
 * @param {int} portfolio_id the user identification number
 * @return{integer} return holding balance to the user to make an update.
 * @throws {InvalidArgumentException} if the user enters wrong portfolio id
 */
function update_holding (portfolio_id) {

}
/**
 * Function that deletes the holding amount.
 * @param {int} portfolio_id the user identification number
 * @returns {boolean} Returns confirmation status
 * @throws {InvalidArgumentException} if portfolio is invalid.
 */
function delete_holding (portfolio_id) {
}
/**
 * Function that retrieval of user's answers data.
 * @param {int} user_id the user identification number
 * @returns {String} Return arrays of user answers.
 * @throws {InvalidArgumentException} if user id is invalid
 */
function fetch_saved_answers (user_id) {
}
/**
 * Function that submit a user's questionnaire answers.
 * @param {int} user_id the user identification number
 * @throws {InvalidArgumentException} if user id is invalid
 */
function submit_answer (user_id) {
}
/**
 * Function that updates the user's questionnaire answers.
 * @param {int} user_id the user identification number
 * @returns {String} return answers to make changes and update.
 * @throws {InvalidArgumentException} if the user enters no value id.
 */
function update_answers (user_id) {

}
/**
 * Function that clear the user's questionnaire answers.
 * @param {int} user_id the user identification number
 * @throws {InvalidArgumentException} if the user enters no value id.
 */
function clear_answers (user_id) {
}


