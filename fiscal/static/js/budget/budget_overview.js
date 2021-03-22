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

    const renderBudgetForm = (saveFunction, cancelFunction) => {
        let form = {};

        form.container = document.createElement("tr");
        form.container.classList.add("scrollable");

        /* Purchase Date for Expense Items */
        form.purchase_date = document.createElement("input");
        form.purchase_date.type = "date";

        let dateCell = document.createElement("td");
        dateCell.style.textAlign = "right";
        dateCell.appendChild(form.purchase_date);
        form.container.appendChild(dateCell);

        /* Transaction Details for Expense Items */
        form.details = document.createElement("input");
        form.details.type = "text";

        let detailsCell = document.createElement("td");
        detailsCell.style.textAlign = "left";
        detailsCell.appendChild(form.details);
        form.container.appendChild(detailsCell);

        /* Cost for Expense Items */
        form.cost = document.createElement("input");
        form.cost.type = "number";
        form.cost.min = "0.01";
        form.cost.step = "0.01";

        let cost_cell = document.createElement("td");
        cost_cell.style.textAlign = "right";
        cost_cell.appendChild(form.cost);
        form.container.appendChild(cost_cell);

        /* Categories for Expense Items */
        const categories = ["Housing", "Transportation", "Debt", "Insurance",
            "Utilities", "Medical/Healthcare", "Savings", "Retirement", "Education",
            "Groceries/Household", "Entertainment", "Essentials", "Non-Essentials", "Other"];

        form.categories = makePickList(categories);

        let categoryCell = document.createElement("td");
        categoryCell.style.textAlign = "left";
        categoryCell.appendChild(form.categories);
        form.container.appendChild(categoryCell);

        /* Submit Handler for Expense Items */
        form.save = createButton({
            type: "btn-success",
            text: "Save"
        });
        form.save.addEventListener("click", saveFunction);
        let save_cell = document.createElement("td");
        save_cell.style.textAlign = "center";
        save_cell.appendChild(form.save);
        form.container.appendChild(save_cell);

        /* Cancel Handler for Expense Items */
        form.cancel = createButton({
            type: "btn-danger",
            text: "Cancel"
        });
        form.cancel.addEventListener("click", cancelFunction);
        let cancel_cell = document.createElement("td");
        cancel_cell.style.textAlign = "center";
        cancel_cell.appendChild(form.cancel);
        form.container.appendChild(cancel_cell);

        return form;
    };

    const handleCreateExpense = (container) => {
        let tableBody = container.getElementsByTagName("tbody")[0];
        let form = renderBudgetForm(function () {
            let data = {};

            data["purchase_date"] = form.purchase_date.value;
            data["transaction"] = form.details.value;
            data["cost"] = parseFloat(form.cost.value);
            data["category"] = form.categories.value;

            input_item(data, (new_data) => {
                all_expenses.push(new_data);
                let expenses = tableBody.parentElement.parentElement;
                expenses.remove();
                expenses = handleUserExpenses(all_expenses);
                container.appendChild(expenses);
            }, errorDOM);
        }, function () {
            form.container.remove();
        });

        tableBody.appendChild(form.container);
    };

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

            data["purchase_date"] = form.purchase_date.value;
            data["transaction"] = form.details.value;
            data["cost"] = parseFloat(form.cost.value);
            data["category"] = form.categories.value;

            input_item(data, (new_data) => {
                all_expenses[i] = new_data;
                expense_container.remove();
                expense_container = handleUserExpenses(all_expenses);
                elem.appendChild(expense_container);
            }, errorDOM);
        }, function () {
            expense_container.remove();
            expense_container = handleUserExpenses(all_expenses);
            elem.appendChild(expense_container);
        });

        form.purchase_date.value = expenseItem["purchase_date"];
        form.details.value = expenseItem["transaction"];
        form.cost.value = expenseItem["cost"];
        form.categories.value = expenseItem["category"];

        row.parentElement.insertBefore(form.container, row);
        row.remove();
    }

    const handleExpenseDelete = (container, expense_id) => {
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

        all_expenses = expenses;
        
        for (let i = 0; i < expenses.length; i++) {
            let element = expenses[i];

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

        createExpenseButton.addEventListener("click", function () {
            handleCreateExpense(expense_view);
        });

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