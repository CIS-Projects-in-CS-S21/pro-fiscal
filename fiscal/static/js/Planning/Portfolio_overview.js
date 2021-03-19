/**
 * @param {function} successHandler callback function to handle the data
 * @param {Object} error_elem the element to add a useful error message to
 * @returns {boolean} confirmation status
 * @throws {InvalidArgumentException} if the user enters invalid id or account name.
 */
function get_all_portfolios(successHandler, error_elem) {
    let init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Authorization': "token " + localStorage.getItem("key")
        }
    }
    fetch("/planning/portfolio/", init)
        .then((response) => {
            if (!response.ok) {
                throw new Error("" +  response.status)
            }
            return response.json();
        }).then(data =>{
            successHandler(data);
        }).catch(error => {
            error_elem.innerText = error;
    })
}

/**
 * Function that return user a single portfolio.
 * @param {int} portfolio_id the user identification number
 * @throws {InvalidArgumentException} when the user enter no value id.
 * @returns {Array} arrays of portfolios
 */
function get_portfolio(portfolio_id) {
    let init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': "token " + localStorage.getItem("key")
            },
        }

    fetch("/planning/portfolio/" + portfolio_id, init)
            .then(response => {
                console.log(response);
                return response.json();
            }).catch((error) => {
                console.error(error);
        });

    return portfolio;
}

/**
 * Function that creates user portfolio account.
 * @param {Object} data the data sent to the creation API
 * @param {Object} error_elem the element to add a useful error message to
 * @returns {boolean} confirmation status
 * @throws {InvalidArgumentException} if the user enters invalid id or account name.
 */
function create_portfolio(data, successHandler, error_elem) {
    if(!data["holdings"]){
        data["holdings"] = [];
    }

    let init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': "token " + localStorage.getItem("key")
            },
            body: JSON.stringify(data)
        }

        fetch("/planning/portfolio/", init)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("" + response.status)
                }
                return response.json();
        }).then((data) => {
            successHandler(data);
            }
        ).catch(error => {
            error_elem.innerText = error;
    })

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
 * @param {int} portfolio_id the portfolio identification number.
 * @param {Object} error_elem the element to add a useful errror message to.
 * @returns {boolean} Returns confirmation status.
 * @throws {InvalidArgumentException} if the user enters no value id.
 */
function delete_portfolio(portfolio_id, successHandler, error_elem) {
    let init = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': "token " + localStorage.getItem("key")
            },

        }

        fetch("/planning/portfolio/" + portfolio_id, init)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("" + response.status)
                }
            }).then(() => {
                successHandler()
            }
        ).catch(error => {
            error_elem.innerText = error;
    })

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

function dud_function () {
    console.log("For testing purposes");
}

/**
 * 
 */
function render_portfolio_overview(){
    let all_portfolios = [];
    let error = document.createElement("div");
    error.classList.add("error");

    let numPortfolios = 0;

    let portfolio_listing = document.createElement("div");

    const makeButton = (buttonType, buttonText, handlerFunction) => {
        let button = createButton({
            type: buttonType,
            text: buttonText
        });

        button.addEventListener("click", handlerFunction);

        return button;
    };

    const makePickList = (optionList) => {
        let list = document.createElement("select");
        for(item in optionList){
            let option = document.createElement("option");
            option.value = optionList[item];
            option.innerText = optionList[item];
            list.appendChild(option);
        }
        return list;
    }

    // const handlePortfolioButtons = () => {
    //     let buttonGroup = document.createElement("div");
    //     let updatePortfolio = makeButton("btn-secondary", "Update Portfolio", dud_function);
    //     let deletePortfolio = makeButton("btn-danger", "Delete Portfolio", function (){
    //             elem = deletePortfolio.parentElement.parentElement;
    //             let to_delete = portfolios[elem.list_id];
    //             console.log(portfolios);
    //             console.log(elem.list_id);
    //             console.log("deleting" + to_delete["id"]);
    //             // delete_portfolio(to_delete["id"], error);
    //     });
    //
    //     buttonGroup.appendChild(updatePortfolio);
    //     buttonGroup.appendChild(deletePortfolio);
    //
    //     return buttonGroup;
    // }

    const handleHoldings = (holding) => {
            let holding_elem = document.createElement("div");

            let cleaner_holdings = [];

            for (let i = 0; i < holding.length; i++) {
                let holdingItem = holding[i];

                cleaner_holdings[i] = {};

                cleaner_holdings[i]["Security Type"] = holdingItem["security_type"];
                cleaner_holdings[i]["Ticker"] = holdingItem["ticker"];
                cleaner_holdings[i]["Price"] = holdingItem["price"];
                cleaner_holdings[i]["Shares"] = holdingItem["shares"];
                cleaner_holdings[i]["Purchase Date"] = holdingItem["purchase_date"];
                cleaner_holdings[i]["Cost Basis"] = holdingItem["cost_basis"];
                cleaner_holdings[i]["Update"] = `<button type='button' class='btn btn-secondary' onclick= 'dud_function()'>Update</button>`;

                // "` + CRUD_icons.update + `" onclick= "window.location.hash = '#/bookUpdate/` + cleanerResults[i].id + `'">
                cleaner_holdings[i]["Delete"] = `<button type='button' class='btn btn-danger' onclick= 'dud_function()'>Delete</button>`;
            }

            let holdingTable = createTable({
                objList: cleaner_holdings,
                sortOrderPropName: "Security Type"
            });

            holding_elem.appendChild(holdingTable);

            return holding_elem;
        }

    const createContents = (portfolio_item) => {
            let elem = document.createElement("div");
            elem.classList.add("portfolio-content");

            let account_type = document.createElement("p");
            account_type.classList.add("padded_paragraph");
            account_type.innerText = "Account Type: " + portfolio_item["account_type"];

            let description = document.createElement("p");
            description.classList.add("padded_paragraph");
            description.innerText = portfolio_item["description"];

            let balance = document.createElement("p");
            balance.classList.add("padded_paragraph");
            balance.innerText = "Balance: $" + portfolio_item["balance"];

            // let portfolioButtons = handlePortfolioButtons();
            let updatePortfolio = makeButton("btn-secondary", "Update Portfolio", dud_function);
            let deletePortfolio = makeButton("btn-danger", "Delete Portfolio", function (){
                let elem_to_delete = deletePortfolio.parentElement.parentElement;
                let portfolio = all_portfolios[elem_to_delete["list_id"]];
                // console.log(elem_to_delete["list_id"]);
                // console.log(all_portfolios);
                delete_portfolio(portfolio["id"],
                    () => {
                        // remove button
                        elem_to_delete.previousSibling.remove()
                        // remove div
                        elem_to_delete.remove()},
                    error);
                numPortfolios--;

            });

            let portfolioButtons = document.createElement("div");
            portfolioButtons.appendChild(updatePortfolio);
            portfolioButtons.appendChild(deletePortfolio);

            let createHolding = makeButton("btn-success", "Create Holding", dud_function);

            let holdings = handleHoldings(portfolio_item["holdings"]);

            elem.appendChild(account_type);
            elem.appendChild(description);
            elem.appendChild(balance);

            elem.appendChild(portfolioButtons);
            elem.appendChild(document.createElement("p"));

            elem.appendChild(createHolding);
            elem.appendChild(document.createElement("p"));

            elem.appendChild(holdings);

            return elem;
        }

    const handleUserPortfolios = (portfolios) => {
        // called when all the portfolios are being rendered, clear the list
        all_portfolios = [];
        for (let i = 0; i < portfolios.length; i++) {
            handleSinglePortfolio(portfolios[i]);

        }
    }

    const handleSinglePortfolio = (portfolio_item) => {
        all_portfolios.push(portfolio_item);

        let portfolio_button = document.createElement("button");
        portfolio_button.type = "button";
        portfolio_button.classList.add("collapsible-overview");

        portfolio_button.innerText = portfolio_item["name"];

        let portfolio_contents = createContents(portfolio_item);
        portfolio_contents["list_id"] = numPortfolios++;

        portfolio_listing.appendChild(portfolio_button);
        portfolio_listing.appendChild(portfolio_contents);

        portfolio_button.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }

    const renderPortfolioCreation = () => {
        let type_options = ["IRA", "401K", "Savings"];
        let elem = document.createElement("div");
        elem.classList.add("portfolio-creation");

        let name_label = document.createElement("label");
        name_label.innerText = "Name";
        let name = document.createElement("input");
        name.type = "text";
        let account_type_label = document.createElement("label");
        account_type_label.innerText = "Account Type";
        let account_type = makePickList(type_options);
        let balance_label = document.createElement("label");
        balance_label.innerText = "Balance";
        let balance = document.createElement("input");
        balance.type = "text";
        let description_label = document.createElement("label");
        description_label.innerText = "Description";
        let description = document.createElement("textarea");
        description.maxLength = 250;
        let submit = makeButton("btn-secondary", "Submit", function () {

            // TODO: add validation and errors

            let data = {};
            data["name"] = name.value;
            data["account_type"] = account_type.value;
            data["balance"] = parseFloat(balance.value);
            data["description"] = description.value;
            create_portfolio(data, render, error);
        })
        let cancel = makeButton("btn-danger", "Cancel", render);

        elem.appendChild(name_label);
        elem.appendChild(name);
        elem.appendChild(account_type_label);
        elem.appendChild(account_type);
        elem.appendChild(balance_label);
        elem.appendChild(balance);
        elem.appendChild(description_label);
        elem.appendChild(description);
        elem.appendChild(submit);
        elem.appendChild(cancel);

        return elem

    }
    const render = () => {
        portfolio_listing.innerHTML = "";
        let createPortfolio = makeButton("btn-success", "Create Portfolio", function () {
            portfolio_listing.insertBefore(renderPortfolioCreation(), createPortfolio);
            portfolio_listing.removeChild(createPortfolio)
        });
        portfolio_listing.appendChild(error);
        portfolio_listing.appendChild(createPortfolio);

        portfolio_listing.appendChild(document.createElement("p"));

        get_all_portfolios(handleUserPortfolios, error);
    };

    render();

    return portfolio_listing;
}