/**
 * Function that fetches expense items from the database based on the provided user id.
 * @param {id} user_id ID of the user.
 * @throws {InvalidArgumentException} If user_id is NaN, null, etc.
 * @returns {Array} Collection of budget items associated with the user.
 */
function fetch_user_items (user_id) {
    
}

/**
 * Function that creates and renders the form for adding an item.
 * @returns {Form} Returns an expense item form for the user to input.
 */
function submit_form () {

}

/**
 * Function that adds an expense item to the database.
 * @param {Object} expense Item consisting of a user's ID, the purchase date, a description of the transaction, and the cost of the transaction
 * @returns {Object} Returns an expense item, but with additional information about its spending category as dictated by the Budget Classifier.
 * @throws Will throw an error if null or an empty expense object is inputted.
 * @throws Will throw an error if a user_id is not provided, NaN, null, etc.
 */
function input_item (expense) {
    
}

/**
 * Function that creates and renders the form for updating an item, preloading in existing data.
 * @param {Object} expense Item consisting of a user's ID, the purchase date, a description of the transaction, and the cost of the transaction
 * @returns {Form} Returns an expense item form for the user to update.
 */
function update_form (expense) {

}

/**
 * Function that updates an existing expense item.
 * @param {int} expense_id ID of the expense item.
 * @param {Object} expense Item consisting of a purchase date, a description of the transaction, the cost of the transaction, and the spending category of the item.
 * @returns {Object} An updated expense item.
 * @throws {InvalidArgumentException} If expense_id is NaN, null, etc.
 * @throws Will throw an error if null or an empty expense object is inputted.
 * @throws Will throw an error if a user_id is not provided, NaN, null, etc.
 * @throws Will throw an error if the item associated with the given expense_id cannot be found.
 */
function update_item (expense_id, expense) {
    
}

/**
 * Function that deletes the item with the given expense_id from the database.
 * @param {int} expense_id ID of the expense
 * @throws {InvalidArgumentException} If expense_id is NaN, null, etc.
 * @throws Will throw an error if the expense item with the given expense_id cannot be found.
 */
function delete_item (expense_id) {
    
}