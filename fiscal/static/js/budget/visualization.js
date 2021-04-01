function render_budget_visualization() {

    const renderExpenses = (expenseItems) => {
        if (expenseItems.length > 0) {
            let sumsCategory = map_by_category(expenseItems);
            render_categorical_spending(sumsCategory);
        } else {
            errorDOM.innerText = "You have no Expense Items added. Please add one in the Spending Overview";
        }
    }

    const obtainExpenses = () => {
        budget_api.getAllExpenseItems(renderExpenses, errorDOM);
    };

    /**
     * Function that given an Array of expense items, render the visualization of the spending by category.
     * @param {Array} sumsCategory Array of sums of different categories.
     * @throws {InvalidArgumentException} If expense is not an array, contains no items, null, etc.
     * @throws Will throw an error if null or an empty expense object is inputted.
     */
    const render_categorical_spending = (sumsCategory) => {
        var ctx = document.getElementById('myChart').getContext('2d');

        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',

            // The data for our dataset
            data: {
                labels: categories,
                datasets: [{
                    label: "Categorical Spending",
                    backgroundColor: COLOR_OPTIONS,
                    data: sumsCategory
                }]
            },

            // Configuration options go here
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontSize: 16
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                        label: function (tooltipItem, data) {
                            return '$' + data['datasets'][0]['data'][tooltipItem['index']];
                        },
                        afterLabel: function (tooltipItem, data) {
                            var dataset = data['datasets'][0];
                            var percent = (dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100;
                            percent = percent.toFixed(2);
                            return '(' + percent + '%)';
                        }
                    }
                },
                plugins: {
                    datalabels: {
                        display: false,
                    },
                }
            }
        });

        // Used to remove the Chart when we exit out of the Portfolio Growth Page
        function removeChart() {
            chart.destroy();
        }

        window.addEventListener('hashchange', removeChart);
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
                    sum: a["amount"] + b["amount"]
                }));

                summedData.push(sum.sum);
            } else if (itemsByCategory.length === 1) {
                let item = itemsByCategory[0];
                summedData.push(item["amount"]);
            } else {
                summedData.push(0);
            }
        }

        return summedData;
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
    title.innerText = "Your Spending by Expense Category";
    title.classList.add('text-center');

    let errorDOM = document.createElement("div");
    errorDOM.classList.add("error");

    obtainExpenses();

    content.appendChild(title);
    content.appendChild(errorDOM);

    return content;
}