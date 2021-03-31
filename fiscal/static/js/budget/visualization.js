function render_budget_visualization() {

    const obtainExpenses = () => {
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

                // console.log(expenseItems);
                map_by_category(expenseItems);
            }).catch(error => {
                status = false;
                console.log(error);
                errorDOM.innerText = error;
            })
    };

    /**
     * Function that given an Array of expense items, render the visualization of the spending by category.
     * @param {Array} expense_items Array of Expense Items associated with the user.
     * @throws {InvalidArgumentException} If expense is not an array, contains no items, null, etc.
     * @throws Will throw an error if null or an empty expense object is inputted.
     */
    const render_categorical_spending = (expense_items) => {

    }

    /**
     * Function that given an Array of expense items, filter items by their category.
     * @param {Array} expense_items Array of Expense Items associated with the user.
     * @returns {Array} Array of floating values representing the spending by category.
     * @throws {InvalidArgumentException} If expense is not an array, contains no items, null, etc.
     */
    const map_by_category = (expense_items) => {
        let summedData = [];

        for (let i = 0; i < categories.length; i++) {
            let itemsByCategory = expense_items.filter(function (item) {
                return item["category"] === categories[i];
            });

            if (itemsByCategory.length > 1) {
                let sum = itemsByCategory.reduce((a, b) => ({
                    sum: a["cost"] + b["cost"]
                }));

                summedData.push(sum.sum);
            } else if (itemsByCategory.length === 1) {
                let item = itemsByCategory[0];
                summedData.push(item["cost"]);
            } else {
                summedData.push(0);
            }
        }

        console.log(summedData);
    }

    const categories = ["Housing", "Transportation", "Debt", "Insurance",
        "Utilities", "Medical/Healthcare", "Savings", "Retirement", "Education",
        "Groceries/Household", "Entertainment", "Essentials", "Non-Essentials", "Other"];

    const COLOR_OPTIONS = [
        "rgb(0, 63, 92)", /* Blue Dark */
        "rgb(188, 80, 144)", /* Purple Light */
        "rgb(255, 166, 0)", /* Yellow Dark */
        "rgb(239, 86, 117)", /* Red Bright */
        "rgb(59, 122, 46)", /* Green Dark */
        "rgb(66, 61, 107)", /* Indigo Dark */
        "rgb(237, 130, 85)", /* Orange Light */
        "rgb(137, 78, 116)", /* Purple Dark */
        "rgb(133, 237, 85)", /* Green Light */
        "rgb(100, 237, 206)", /* Blue Light */
        "rgb(240, 231, 165)", /* Yellow Light */
        "rgb(200, 91, 41)", /* Orange Dark */
        "rgb(203, 0, 40)", /* Red Dark */
        "rgb(103, 76, 255)", /* Indigo Light */
    ];

    let content = document.createElement("div");

    let title = document.createElement("h3");
    title.innerText = "Your Expenses by Category";

    obtainExpenses();

    content.appendChild(title);

    return content;
}