/**
 * Function that return user portfolios.
 * @param {int} user_id the user identification number
 * @throws {InvalidArgumentException} when the user enter no value id.
 * @returns {Array} arrays of portfolios
 */
function get_portfolios(user_id) {

}

/**
 * Function that creates user portfolio account.
 * @param {int} user_id the user identification number
 * @param {string} account_name the user is known or referred to that account
 * @returns {boolean} confirmation status
 * @throws {InvalidArgumentException} if the user enters invalid id or account name.
 */
function create_portfolio(user_id, account_name) {

}

/**
 * Function that updates the user portfolio.
 * @param {int} portfolio_id the user identification number.
 * @param {string} account_name the user is known or referred to that account.
 * @returns {Object} return user account information to make changes and update.
 * @throws {InvalidArgumentException} if the user enters no value id or account name.
 */
function update_portfolio(portfolio_id, account_name) {

}

/**
 * Function that deletes the user portfolio.
 * @param {int} portfolio_id the user identification number.
 * @returns {boolean} Returns confirmation status.
 * @throws {InvalidArgumentException} if the user enters no value id.
 */
function delete_portfolio(portfolio_id) {

}

/**
 * Function that adds the value to the user portfolio account.
 * @param {int} portfolio_id the user identification number.
 * @param {float} amount value of loss or an asset.
 * @returns {Object} the updated portfolio account to the user.
 * @throws {InvalidArgumentException} if the user add no value or -ve value.
 */
function add_holding(portfolio_id, amount) {

}

/**
 * Function that updates the holding balance of the user.
 * @param {int} portfolio_id the user identification number.
 * @return {float} return holding balance to the user to make an update.
 * @throws {InvalidArgumentException} if the user enters wrong portfolio id.
 */
function update_holding(portfolio_id) {

}

/**
 * Function that deletes the holding amount.
 * @param {int} portfolio_id the user identification number.
 * @returns {boolean} Returns confirmation status.
 * @throws {InvalidArgumentException} if portfolio is invalid.
 */
function delete_holding(portfolio_id) {

}

/**
 * Function that retrieval of user's answers data.
 * @param {int} user_id the user identification number.
 * @returns {Array} Return arrays of user answers.
 * @throws {InvalidArgumentException} if user id is invalid.
 */
function fetch_saved_answers(user_id) {

}

/**
 * Function that submit a user's questionnaire answers.
 * @param {int} user_id the user identification number.
 * @throws {InvalidArgumentException} if user id is invalid.
 */
function submit_answer(user_id) {

}

/**
 * Function that updates the user's questionnaire answers.
 * @param {int} user_id the user identification number.
 * @returns {String} return answers to make changes and update.
 * @throws {InvalidArgumentException} if the user enters no value id.
 */
function update_answers(user_id) {

}

/**
 * Function that clear the user's questionnaire answers.
 * @param {int} user_id the user identification number.
 * @throws {InvalidArgumentException} if the user enters no value id.
 */
function clear_answers(user_id) {

}

/**
 * 
 */
function render_portfolio_overview() {

    const getPortfolioData = () => {
        let portfolios = "";

        fetch("/static/json/portfolio_test.json")
            .then(response => {
                return response.json();
            })
            .then((data) => {
                portfolios = data["portfolio_accounts"];
            })
            .then(() => {
                // Do all the interface stuff here
                handleUserPortfolios(portfolios);
            })
    };

    const handleUserPortfolios = (portfolios) => {
        // console.log(portfolios);

        /* Create table for Holdings */
        const handleHoldings = (holding) => {
            let holding_elem = document.createElement("div");

            /*
                let holding_item = holding[i];
                let holder_item = document.createElement("div");

                let security_type = document.createElement("p");
                security_type.innerText = "Security Type: " + holding_item["security_type"]["type"];

                let ticker = document.createElement("p");
                ticker.innerText = holding_item["ticker"];

                let price = document.createElement("p");
                price.innerText = "$" + holding_item["price"];

                let shares = document.createElement("p");
                shares.innerText = holding_item["shares"] + " Shares";

                let purchase_date = document.createElement("p");
                purchase_date.innerText = holding_item["purchase_date"] !== null ? holding_item["purchase_date"] : "No Purchase Date provided";

                let cost_basis = document.createElement("p");
                cost_basis.innerText = holding_item["cost_basis"] !== null ? holder_item["cost_basis"] : "No Cost Basis provided";

                holder_item.appendChild(security_type);
                holder_item.appendChild(ticker);
                holder_item.appendChild(price);
                holder_item.appendChild(shares);
                holder_item.appendChild(purchase_date);
                holder_item.appendChild(cost_basis);

                */


            let holdingTable = createTable({
                objList: holding,
                sortOrderPropName: "security_type"
            });

            holding_elem.appendChild(holdingTable);

            return holding_elem;
        }

        const createContents = (portfolio_item) => {
            let elem = document.createElement("div");
            elem.classList.add("portfolio-content");

            let account_type = document.createElement("p");
            account_type.innerText = portfolio_item["account_type"];

            let description = document.createElement("p");
            description.innerText = portfolio_item["description"];

            let balance = document.createElement("p");
            balance.innerText = "$" + portfolio_item["balance"];

            let holdings = handleHoldings(portfolio_item["holdings"]);

            elem.appendChild(account_type);
            elem.appendChild(description);
            elem.appendChild(balance);
            elem.appendChild(holdings);

            return elem;
        }

        for (let i = 0; i < portfolios.length; i++) {
            let portfolio_button = document.createElement("button");
            portfolio_button.type = "button";
            portfolio_button.classList.add("collapsible-overview");

            let portfolio_item = portfolios[i];

            portfolio_button.innerHTML = portfolio_item["name"];

            let portfolio_contents = createContents(portfolio_item);

            portfolio_listing.appendChild(portfolio_button);
            portfolio_listing.appendChild(portfolio_contents);

            portfolio_button.addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }



    }

    let portfolio_listing = document.createElement("div");


    getPortfolioData();

    return portfolio_listing;
}