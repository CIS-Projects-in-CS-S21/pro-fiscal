/**
 * Function that fetches expense items from the database based on the provided user id.
 * @param {int} user_id ID of the user.
 * @throws {InvalidArgumentException} If user_id is NaN, null, etc.
 * @returns {Array} Collection of budget items associated with the user.
 */
function fetch_user_items(user_id) {

}

/**
 * Function that creates and renders the form for adding an item.
 * @returns {Form} Returns an expense item form for the user to input.
 */
function submit_form() {

}

/**
 * Function that adds an expense item to the database.
 * @param {Object} expense Item consisting of a user's ID, the purchase date, a description of the transaction, and the cost of the transaction
 * @returns {Object} Returns an expense item, but with additional information about its spending category as dictated by the Budget Classifier.
 * @throws Will throw an error if null or an empty expense object is inputted.
 * @throws Will throw an error if a user_id is not provided, NaN, null, etc.
 */
function input_item(expense) {

}

/**
 * Function that creates and renders the form for updating an item, preloading in existing data.
 * @param {Object} expense Item consisting of a user's ID, the purchase date, a description of the transaction, and the cost of the transaction
 * @returns {Form} Returns an expense item form for the user to update.
 */
function update_form(expense) {

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
function update_item(expense_id, expense) {

}

/**
 * Function that deletes the item with the given expense_id from the database.
 * @param {int} expense_id ID of the expense.
 * @throws {InvalidArgumentException} If expense_id is NaN, null, etc.
 * @throws Will throw an error if the expense item with the given expense_id cannot be found.
 */
function delete_item(expense_id) {

}

function render_budget_overview() {

    const getExpenseData = () => {
        let expenses = "";

        fetch("/static/json/expense_test.json")
            .then(response => {
                return response.json();
            })
            .then((data) => {
                expenses = data["expense_items"];
            })
            .then(() => {
                // console.log(expenses);
                let expense_container = handleUserExpenses(expenses);
                expense_view.appendChild(expense_container);
            })
    };

    const handleUserExpenses = (expenses) => {
        let expense_container = document.createElement("div");

        let cleaner_expenses = [];

        expenses.forEach((element, index) => {
            cleaner_expenses[index] = {
                "Purchase Date": element["purchase_date"],
                "Transaction Detail": element["transaction"],
                "Cost": element["cost"],
                "Category": element["category"],
                "Update": `<button type='button' class='btn btn-secondary' onclick= 'dud_function()'>Update</button>`,
                "Delete": `<button type='button' class='btn btn-danger' onclick= 'dud_function()'>Delete</button>`
            };
        });

        let expenseTable = createTable({
            objList: cleaner_expenses,
            sortOrderPropName: "Purchase Date"
        });

        expense_container.appendChild(expenseTable);

        return expense_container;
    }

    let expense_view = document.createElement("div");

    let createExpense = createButton({
        type: "btn-success",
        text: "Add Expense"
    });

    createExpense.addEventListener("click", dud_function);

    getExpenseData();

    expense_view.appendChild(createExpense);

    expense_view.appendChild(document.createElement("p"));

    return expense_view;
}