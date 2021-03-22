const categories = ["Housing", "Transportation", "Debt", "Insurance",
    "Utilities", "Medical/Healthcare", "Savings", "Retirement", "Education",
    "Groceries/Household", "Entertainment", "Essentials", "Non-Essentials", "Other"];

/**
 * Function that fetches expense items from the database based on the provided user id.
 * @param {int} user_id ID of the user.
 * @throws {InvalidArgumentException} If user_id is NaN, null, etc.
 * @returns {Array} Collection of budget items associated with the user.
 */
const getExpenseData = (appendDOM, successHandler, errorDOM) => {
    let status = false;

    fetch("/static/json/expense_test.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            status = !status;
            return response.json();
        })
        .then((data) => {
            let table = successHandler(data);
            appendDOM.appendChild(table);
        }).catch(error => {
            status = false;
            console.log(error);
            errorDOM.innerText = error;
        })
};

function render_create_form() {

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
function render_update_form(expense) {

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

    const createExpense = (container) => {
        console.log("Create");
    }

    const handleExpenseUpdate = (parent_elem, expense_id) => {
        console.log(expense_id);
    }

    const handleExpenseDelete = (parent_elem, expense_id) => {
        console.log(expense_id);
    }

    const handleUserExpenses = (expenses) => {
        let expense_container = document.createElement("div");

        let cleaner_expenses = [];

        if (expenses.length === 0) {
            cleaner_expenses.push({
                "Purchase Date": "",
                "Transaction Detail": "",
                "Cost": "",
                "Category": "",
                "Update": "",
                "Delete": ""
            });
        }

        let expenseItems = expenses["expense_items"];

        for (let i = 0; i < expenseItems.length; i++) {
            let element = expenseItems[i];

            let update_button = createButton({
                type: "btn-secondary",
                text: "Update"
            });

            update_button["expense_id"] = element["id"];
            update_button.addEventListener("click", function () {
                handleExpenseUpdate(this, this["expense_id"]);
            });

            let delete_button = createButton({
                type: "btn-danger",
                text: "Delete"
            });

            delete_button["expense_id"] = element["id"];
            delete_button.addEventListener("click", function () {
                handleExpenseDelete(this, this["expense_id"]);
            });

            cleaner_expenses.push({
                "Purchase Date": element["purchase_date"],
                "Transaction Detail": element["transaction"],
                "Cost": element["cost"],
                "Category": element["category"],
                "Update": update_button,
                "Delete": delete_button
            });
        }

        console.log(cleaner_expenses);
        
        let expenseTable = createTable({
            objList: cleaner_expenses,
            sortOrderPropName: "Purchase Date"
        });

        expense_container.appendChild(expenseTable);

        return expense_container;
    }

    function render() {
        expense_view.innerHTML = "";
        all_expenses = [];
        num_expenses = 0;

        let createExpenseButton = createButton({
            type: "btn-success",
            text: "Add Expense"
        });

        createExpenseButton.addEventListener("click", dud_function);

        expense_view.appendChild(errorDOM);
        expense_view.appendChild(createExpenseButton);
        expense_view.appendChild(document.createElement("p"));

        getExpenseData(expense_view, handleUserExpenses, errorDOM);
    }

    /* Main starts here */
    let all_expenses = [];
    let num_expenses = 0;

    let errorDOM = document.createElement("div");
    errorDOM.classList.add("error");

    let expense_view = document.createElement("div");

    render();

    return expense_view;
}