/**
 * Function that fetches debt items from the database based on the provided user id.
 * @param {int} user_id ID of the user.
 * @throws {InvalidArgumentException} If user_id is NaN, null, etc.
 * @returns {Array} Collection of debt items associated with the user.
 */
function fetch_user_debts (user_id) {

}

/**
 * Function that creates and renders the form for adding a debt item.
 * @returns {Form} Returns a debt item form for the user to input.
 */
function submit_form () {

}

/**
 * Function that adds a debt item to the database.
 * @param {Object} debt Item consisting of a user's ID, current balance, loan interest rate, description, and monthly contributions.
 * @returns {Object} Returns an expense item, but with additional information about its spending category as dictated by the Budget Classifier.
 * @throws Will throw an error if null or an empty debt object is inputted.
 * @throws Will throw an error if a user_id is not provided, NaN, null, etc.
 */
function add_new_loan (debt) {

}

/**
 * Function that creates and renders the form for updating a debt item, preloading in existing data.
 * @param {Object} debt Item consisting of a user's current balance, loan interest rate, description, and monthly contributions.
 * @returns {Form} Returns a debt item form for the user to update.
 */
function update_form (debt) {

}

/**
 * Function that updates an existing debt item.
 * @param {int} debt_id ID of the expense item.
 * @param {Object} debt Item consisting of a current balance, loan interest rate, description, and monthly contributions.
 * @returns {Object} An updated debt item.
 * @throws {InvalidArgumentException} If debt_id is NaN, null, etc.
 * @throws Will throw an error if null or an empty debt object is inputted.
 * @throws Will throw an error if a user_id is not provided, NaN, null, etc.
 * @throws Will throw an error if the item associated with the given debt_id cannot be found.
 */
function update_loan (debt_id, debt) {

}

/**
 * Function that deletes the item with the given debt_id from the database.
 * @param {int} debt_id ID of the debt item.
 * @throws {InvalidArgumentException} If debt_id is NaN, null, etc.
 * @throws Will throw an error if the debt item with the given debt_id cannot be found.
 */
function remove_loan (debt_id) {

}