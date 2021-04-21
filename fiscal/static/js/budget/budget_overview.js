/**
 * Function that fetches expense items from the database based on the provided user id.
 * @param {DOMElement} appendDOM Element to render the component in.
 * @param {Function} successHandler Function to execute when you successfully retrieve the Expense Data.
 * @param {DOMElement} errorDOM Element to render error messages to the component.
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
            let expenseItems = data["expense_items"];

            let table = successHandler(expenseItems);
            appendDOM.appendChild(table);
        }).catch(error => {
            status = false;
            console.log(error);
            errorDOM.innerText = error;
        })
};

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
function input_item(expense, successHandler, errorDOM) {

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

    // Need mechanism to disable pick list for creating expense item
    /**
     * Function that creates a form for a user's personal budget item inputs.
     * @param {*} saveFunction
     * @param {*} cancelFunction
     * @param {*} disablePickList
     * @throws {InvalidArgumentException} If any inputs are invalid, null, etc.
     */

    const renderBudgetForm = (saveFunction, cancelFunction, disablePickList) => {
        let form = {};

        form.container = document.createElement("tr");
        form.container.classList.add("scrollable");

        /* Purchase Date for Expense Items */
        form.transaction_date = document.createElement("input");
        form.transaction_date.type = "date";
        form.transaction_date.valueAsDate = new Date();
        form.transaction_date.classList.add("no_future_inputs", "form-control");

        let dateCell = document.createElement("td");
        dateCell.style.textAlign = "right";
        dateCell.appendChild(form.transaction_date);
        form.container.appendChild(dateCell);

        /* Transaction Details for Expense Items */
        form.description = document.createElement("input");
        form.description.type = "text";
        form.description.classList.add("form-control");

        let detailsCell = document.createElement("td");
        detailsCell.style.textAlign = "left";
        detailsCell.appendChild(form.description);
        form.container.appendChild(detailsCell);

        /* Cost for Expense Items */
        form.amount = document.createElement("input");
        form.amount.type = "number";
        form.amount.min = "0.01";
        form.amount.step = "0.01";
        form.amount.classList.add("form-control");

        let cost_cell = document.createElement("td");
        cost_cell.style.textAlign = "right";
        cost_cell.appendChild(form.amount);
        form.container.appendChild(cost_cell);

        /* Categories for Expense Items */
        const categories = ["Housing", "Transportation", "Debt", "Insurance",
            "Utilities", "Medical/Healthcare", "Savings", "Retirement", "Education",
            "Groceries/Household", "Entertainment", "Essentials", "Non-Essentials", "Other"];

        form.categories = makePickList(categories);

        if (disablePickList) {
            form.categories.disabled = true;
            form.categories.value = "Other";
        }

        form.categories.classList.add("form-control");

        let categoryCell = document.createElement("td");
        categoryCell.style.textAlign = "left";
        categoryCell.appendChild(form.categories);
        form.container.appendChild(categoryCell);

        /* Submit Handler for Expense Items */
        form.save = createButton({
            type: "btn-success",
            text: "Save",
            onclickhandler: saveFunction
        });

        // form.save.addEventListener("click", saveFunction);
        let save_cell = document.createElement("td");
        save_cell.style.textAlign = "center";
        save_cell.appendChild(form.save);
        form.container.appendChild(save_cell);

        /* Cancel Handler for Expense Items */
        form.cancel = createButton({
            type: "btn-danger",
            text: "Cancel",
            onclickhandler: cancelFunction
        });

        // form.cancel.addEventListener("click", cancelFunction);
        let cancel_cell = document.createElement("td");
        cancel_cell.style.textAlign = "center";
        cancel_cell.appendChild(form.cancel);
        form.container.appendChild(cancel_cell);

        return form;
    };

    /**
     * Function that deals with the creation of an expense item by the user.
     * @param {*} container
     * @throws {InvalidArgumentException} If any inputs are invalid, null, etc.
     */
    const handleCreateExpense = (container) => {
        let tableBody = container.getElementsByTagName("tbody")[0];
        let form = renderBudgetForm(function () {
            let data = {};
            let errors = [];

            let input_date = '';

            data["transaction_date"] = form.transaction_date.value;
            data["description"] = form.description.value;
            data["amount"] = parseFloat(form.amount.value);
            data["category"] = form.categories.value;

            /*
            if (form.categories.value !== "Automatically Created") {
                let errorMsg = "I don't know how you managed this, but your Category should be predetermined by the Budget Classifier, not manually selected.";
                errors.push(errorMsg);
            }
            */

            /* Error Handling takes place here */
            if (form.description.value === undefined || form.description.value === '') {
                let errorMsg = "Please add a description for your Expense Item!";
                errors.push(errorMsg);
            }

            if (form.transaction_date.value === '') {
                let errorMsg = "You have to add a Purchase Date for your Expense Item.";
                errors.push(errorMsg);
            }

            input_date = new Date(form.transaction_date.value);
            let d = new Date().setHours(0, 0, 0, 0);

            if (days_after_update(d, input_date) < 0) {
                let errorMsg = "You cannot pick a date from the future.";
                errors.push(errorMsg);
            }

            if (form.amount.value === undefined || form.amount.value === '' || isNaN(form.amount.value)) {
                let errorMsg = "Your entered price is either empty or not a number.";
                errors.push(errorMsg);
            } else if (currencyValidation(form.amount.value) === null) {
                let errorMsg = "Your entered price has too many decimal places, or your balance is a negative number.";
                errors.push(errorMsg);
            }

            // console.log(data);

            if (errors.length === 0) {
                budget_api.createExpenseItem(data, (new_data) => {
                    all_expenses.push(new_data);
                    let expenses = tableBody.parentElement.parentElement;
                    expenses.remove();
                    expenses = handleUserExpenses(all_expenses);
                    container.appendChild(expenses);
                }, errorDOM);
            } else {
                modal.renderErrorMessages(errors);
            }
        }, function () {
            form.container.remove();
        }, true);

        formMaxDate("no_future_inputs");

        tableBody.appendChild(form.container);
    };
    /**
     * Function that deals with the updating of an expense item by the user.
     * @param {*} container
     * @throws {InvalidArgumentException} If any inputs are invalid, null, etc.
     */
    const handleExpenseUpdate = (container, expense_id) => {
        let row = container.parentElement.parentElement;
        let expense_container = row.parentElement.parentElement.parentElement.parentElement;
        let elem = expense_container.parentElement;

        let i;
        for (i = 0; i < all_expenses.length; i++) {
            if (all_expenses[i]["id"] === expense_id) {
                break;
            }
        }

        let expenseItem = all_expenses[i];

        let form = renderBudgetForm(function () {
            let data = {};
            let errors = [];

            data["transaction_date"] = form.transaction_date.value;
            data["description"] = form.description.value;
            data["amount"] = parseFloat(form.amount.value);
            data["category"] = form.categories.value;

            data["id"] = all_expenses[i]["id"];

            // console.log(data);

            /* Error Handling takes place here */
            if (form.description.value === undefined || form.description.value === '') {
                let errorMsg = "Please add a description for your Expense Item!";
                errors.push(errorMsg);
            }

            if (form.transaction_date.value === '') {
                let errorMsg = "You have to add a Purchase Date for your Expense Item.";
                errors.push(errorMsg);
            }

            let input_date = new Date(form.transaction_date.value);
            let d = new Date().setHours(0, 0, 0, 0);

            if (days_after_update(d, input_date) < 0) {
                let errorMsg = "You cannot pick a date from the future.";
                errors.push(errorMsg);
            }

            if (form.amount.value === undefined || form.amount.value === '' || isNaN(form.amount.value)) {
                let errorMsg = "Your entered price is either empty or not a number.";
                errors.push(errorMsg);
            } else if (currencyValidation(form.amount.value) === null) {
                let errorMsg = "Your entered price has too many decimal places, or your balance is a negative number.";
                errors.push(errorMsg);
            }

            if (errors.length === 0) {
                budget_api.updateExpenseItem(data,
                    (new_data) => {
                        all_expenses[i] = new_data;
                        expense_container.remove();
                        expense_container = handleUserExpenses(all_expenses);
                        elem.appendChild(expense_container);
                    }, errorDOM);
            } else {
                modal.renderErrorMessages(errors);
            }
        }, function () {
            expense_container.remove();
            expense_container = handleUserExpenses(all_expenses);
            elem.appendChild(expense_container);
        }, false);

        formMaxDate("no_future_inputs");

        form.transaction_date.value = expenseItem["transaction_date"];
        form.description.value = expenseItem["description"];
        form.amount.value = expenseItem["amount"];
        form.categories.value = expenseItem["category"];

        row.parentElement.insertBefore(form.container, row);
        row.remove();
    }
    /**
     * Function that deals with the deletion of an expense item by the user.
     * @param {*} container
     * @param {*} expense_id
     * @throws {InvalidArgumentException} If any inputs are invalid, NaN, null, etc.
     */
    const handleExpenseDelete = (container, expense_id) => {
        function toDeleteExpense() {
            budget_api.deleteExpenseItem(expense_id, () => {
                row.remove();
            }, errorDOM);
        }

        let row = container.parentElement.parentElement;
        modal.confirm("Are you sure you want to delete this expense?", toDeleteExpense);
    }
    /**
     * Function that deals with the list of expenses provided by the user.
     * @param {Array} List of expense items.
     * @throws {InvalidArgumentException} If the expenses array is invalid, NaN, null, etc.
     * @returns {*} expense_container
     */
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

        all_expenses = expenses;

        for (let i = 0; i < expenses.length; i++) {
            let element = expenses[i];

            let update_button = createButton({
                type: "btn-secondary",
                text: "Update",
                onclickhandler: function () {
                    handleExpenseUpdate(this, this["expense_id"]);
                }
            });

            update_button["expense_id"] = element["id"];

            let delete_button = createButton({
                type: "btn-danger",
                text: "Delete",
                onclickhandler: function () {
                    handleExpenseDelete(this, this["expense_id"]);
                }
            });

            delete_button["expense_id"] = element["id"];

            cleaner_expenses.push({
                "Purchase Date": element["transaction_date"],
                "Transaction Detail": element["description"],
                "Cost": element["amount"],
                "Category": element["category"],
                "Update": update_button,
                "Delete": delete_button
            });
        }

        let expenseTable = createTable({
            objList: cleaner_expenses,
            sortOrderPropName: "Purchase Date",
            reverse: true
        });

        expense_container.appendChild(expenseTable);

        return expense_container;
    }
    /**
     * Function that takes the return of handleUserExpenses() to append as a node.
     * @param {Array} List of expense items.
     * @returns {*} expense_container
     */
    function prepareExpenses(expenseItems) {
        let table = handleUserExpenses(expenseItems);
        expense_view.appendChild(table);
    }

    function render() {
        expense_view.innerHTML = "";
        all_expenses = [];
        num_expenses = 0;

        let createExpenseButton = createButton({
            type: "btn-success",
            text: "Add Expense",
            onclickhandler: function () {
                handleCreateExpense(expense_view);
            }
        });

        sortingOrder = "Purchase Date";

        expense_view.appendChild(errorDOM);
        expense_view.appendChild(modal);
        expense_view.appendChild(createExpenseButton);
        expense_view.appendChild(document.createElement("p"));

        budget_api.getAllExpenseItems(prepareExpenses, errorDOM);

        // getExpenseData(expense_view, handleUserExpenses, errorDOM);
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
