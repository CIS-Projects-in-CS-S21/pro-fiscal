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

function dud_function() {
    console.log("For testing purposes");
}

/**
 * Function to render the portfolio overview component.
 * Contains private functions to render the individual sub-components.
 * @returns {Object} div container for the component
 */
function render_portfolio_overview() {
    let all_portfolios = [];

    let error = document.createElement("div");
    error.classList.add("error");

    let numPortfolios = 0;

    let portfolio_listing = document.createElement("div");
    portfolio_listing.classList.add("portfolio-list");

    let modal = modalFW({});

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
        for (item in optionList) {
            let option = document.createElement("option");
            option.value = optionList[item];
            option.innerText = optionList[item];
            list.appendChild(option);
        }
        return list;
    }

    const handleHoldings = (holding) => {
        let holding_elem = document.createElement("div");
        holding_elem.classList.add("holding-data");

        let cleaner_holdings = [];
        if (holding.length === 0) {
            cleaner_holdings.push({
                "Security Type": "",
                "Ticker": "",
                "Price": "",
                "Shares": "",
                "Purchase Date": "",
                "Cost Basis": "",
                "Update": "",
                "Delete": ""
            });
        }

        for (let i = 0; i < holding.length; i++) {
            let holdingItem = holding[i];

            cleaner_holdings[i] = {};

            cleaner_holdings[i]["Security Type"] = holdingItem["security_type"];
            cleaner_holdings[i]["Ticker"] = holdingItem["ticker"];
            cleaner_holdings[i]["Price"] = holdingItem["price"];
            cleaner_holdings[i]["Shares"] = holdingItem["shares"];
            cleaner_holdings[i]["Purchase Date"] = holdingItem["purchase_date"];
            cleaner_holdings[i]["Cost Basis"] = holdingItem["cost_basis"];

            let update_button = createButton({
                type: "btn-secondary",
                text: "Update"
            });
            update_button["holding_id"] = holdingItem["id"];
            update_button.addEventListener("click", function () { handleHoldingUpdate(this, this["holding_id"]); })
            cleaner_holdings[i]["Update"] = update_button;

            let delete_button = createButton({
                type: "btn-danger",
                text: "Delete"
            });
            delete_button["holding_id"] = holdingItem["id"];
            delete_button.addEventListener("click", function () { handleHoldingDelete(this, this["holding_id"]); })
            cleaner_holdings[i]["Delete"] = delete_button;
        }

        let holdingTable = createTable({
            objList: cleaner_holdings,
            sortOrderPropName: "Security Type"
        });

        holding_elem.appendChild(holdingTable);

        return holding_elem;
    }

    const handleHoldingCreate = (portfolio_container, list_id) => {
        let table_body = portfolio_container.getElementsByTagName("tbody")[0];
        let form = renderHoldingForm(function () {
            let data = {};
            data["security_type"] = form.security_type.value;
            data["ticker"] = form.ticker.value;
            data["price"] = parseFloat(form.price.value);
            data["shares"] = parseFloat(form.shares.value);
            if (form.purchase_date.value) {
                data["purchase_date"] = form.purchase_date.value;
            }

            if (form.cost_basis.value) {
                data["cost_basis"] = form.cost_basis.value;
            }

            data["portfolio"] = all_portfolios[list_id]["id"];

            add_holding(data,
                (new_data) => {
                    all_portfolios[list_id]["holdings"].push(new_data);
                    let holdings = table_body.parentElement.parentElement;
                    holdings.remove();
                    holdings = handleHoldings(all_portfolios[list_id]["holdings"]);
                    portfolio_container.appendChild(holdings);
                },
                error)

        }, function () {
            form.container.remove();
        });

        formMaxDate("no_future_inputs");

        table_body.appendChild(form.container);

    }

    const handleHoldingUpdate = (parent_elem, holding_id) => {
        let row = parent_elem.parentElement.parentElement;
        let holdings_div = row.parentElement.parentElement.parentElement.parentElement;
        let elem = holdings_div.parentElement;
        let list_id = elem["list_id"];
        let holdings = all_portfolios[list_id]["holdings"];
        let i;
        for (i = 0; i < holdings.length; i++) {
            if (holdings[i]["id"] === holding_id) {
                break;
            }
        }

        let holding = holdings[i];

        let form = renderHoldingForm(function () {
            let data = {};
            data["security_type"] = form.security_type.value;
            data["ticker"] = form.ticker.value;
            data["price"] = parseFloat(form.price.value);
            data["shares"] = parseFloat(form.shares.value);
            if (form.purchase_date.value)
                data["purchase_date"] = form.purchase_date.value;
            if (form.cost_basis.value)
                data["cost_basis"] = form.cost_basis.value;
            data["portfolio"] = all_portfolios[list_id]["id"];

            add_holding(data,
                (new_data) => {
                    holdings[i] = new_data;
                    holdings_div.remove();
                    holdings_div = handleHoldings(all_portfolios[list_id]["holdings"]);
                    elem.appendChild(holdings_div);
                },
                error)

        }, function () {
            holdings_div.remove();
            holdings_div = handleHoldings(all_portfolios[list_id]["holdings"]);
            elem.appendChild(holdings_div);
        });

        formMaxDate("no_future_inputs");

        form.security_type.value = holding["security_type"];
        form.ticker.value = holding["ticker"];
        form.price.value = holding["price"];
        form.shares.value = holding["shares"];
        form.purchase_date.value = holding["purchase_date"];
        form.cost_basis.value = holding["cost_basis"];

        row.parentElement.insertBefore(form.container, row);
        row.remove();
    }

    const handleHoldingDelete = (parent_elem, holding_id) => {
        function toDeleteHolding () {
            delete_holding(holding_id, () => {
                row.remove();
            }, error)
        }

        let row = parent_elem.parentElement.parentElement;
        modal.confirm("Are you sure you want to delete this holding?", toDeleteHolding);
    }

    const handlePortfolioUpdate = (elem, portfolio, list_id) => {
        elem.innerHTML = "";
        const successFunc = (portfolio_item) => {
            all_portfolios[list_id] = portfolio_item;
            let new_contents = renderPortfolioContents(portfolio_item, list_id);
            // add the updated data to the collapsible button
            elem.previousSibling.innerText = portfolio_item["name"];
            elem.parentElement.insertBefore(new_contents, elem);
            elem.remove();
        };

        /* Render the form for the Portfolio */
        let form = renderPortfolioForm(
            () => {

                // TODO: add validation and errors

                let data = portfolio;
                data["name"] = form.name.value;
                data["account_type"] = form.account_type.value;
                data["balance"] = parseFloat(form.balance.value);
                data["description"] = form.description.value;
                update_portfolio(data, successFunc, error);
            },
            () => {
                let contents = renderPortfolioContents(portfolio, list_id);
                elem.parentElement.insertBefore(contents, elem);
                elem.remove();
            }
        );


        elem.appendChild(form.container);

        form.name.value = portfolio["name"];
        form.account_type.value = portfolio["account_type"];
        form.balance.value = portfolio["balance"];
        form.description.value = portfolio["description"];
    }

    const handlePortfolioCreate = (parent_elem) => {
        let form = renderPortfolioForm(
            function () {

                // TODO: add validation and errors

                const successFunc = (data) => {
                    handleSinglePortfolio(data);
                    portfolio_listing.insertBefore(renderCreateButton(), form.container);
                    form.container.remove();
                }

                let data = {};
                data["name"] = form.name.value;
                data["account_type"] = form.account_type.value;
                data["balance"] = parseFloat(form.balance.value);
                data["description"] = form.description.value;
                create_portfolio(data, successFunc, error);
            },
            function () {
                portfolio_listing.insertBefore(renderCreateButton(), form.container);
                form.container.remove();
            }
        )
        portfolio_listing.insertBefore(form.container, parent_elem);
        portfolio_listing.removeChild(parent_elem)
    }

    const renderPortfolioContents = (portfolio_item, list_id) => {

        const createPortfolioContents = (portfolio_item) => {
            let elem = document.createElement("div");
            elem.classList.add("portfolio-content");

            let portfolio_data = document.createElement("div");
            portfolio_data.classList.add("portfolio-data");
            elem.appendChild(portfolio_data);

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
            let updatePortfolio = makeButton("btn-secondary", "Update Portfolio", function () {
                let portfolio = all_portfolios[elem["list_id"]];
                handlePortfolioUpdate(elem, portfolio, elem["list_id"]);
            });
            updatePortfolio.classList.add("mr-2");

            let deletePortfolio = makeButton("btn-danger", "Delete Portfolio", function () {
                let portfolio = all_portfolios[elem["list_id"]];
                delete_portfolio(portfolio["id"],
                    () => {
                        // remove button
                        elem.previousSibling.remove();
                        // remove div
                        elem.remove();
                    },
                    error);
                numPortfolios--;
            });
            deletePortfolio.classList.add("mr-2");

            let portfolioButtons = document.createElement("div");
            portfolioButtons.appendChild(updatePortfolio);
            portfolioButtons.appendChild(deletePortfolio);

            let holdings = handleHoldings(portfolio_item["holdings"]);

            let createHolding = makeButton("btn-success", "Create Holding", function () {
                handleHoldingCreate(elem, elem["list_id"]);
            });


            portfolio_data.appendChild(account_type);
            portfolio_data.appendChild(description);
            portfolio_data.appendChild(balance);

            elem.appendChild(portfolioButtons);
            elem.appendChild(document.createElement("p"));

            elem.appendChild(createHolding);
            elem.appendChild(document.createElement("p"));

            elem.appendChild(holdings);

            return elem;
        }

        let elem = createPortfolioContents(portfolio_item);
        elem["list_id"] = list_id;
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
        // Only call this when a new account is being added
        all_portfolios.push(portfolio_item);

        let portfolio_button = document.createElement("button");
        portfolio_button.type = "button";
        portfolio_button.classList.add("collapsible-overview");

        portfolio_button.innerText = portfolio_item["name"];

        let portfolio_contents = renderPortfolioContents(portfolio_item, numPortfolios++);

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

    const renderHoldingForm = (saveFunc, cancelFunc) => {
        let form = {};

        form.container = document.createElement("tr");
        form.container.classList.add("scrollable");

        let options = ["Stock", "Bond", "Cash"]; // TODO: replace with list fetched from DB
        form.security_type = makePickList(options);

        let sec_cell = document.createElement("td");
        sec_cell.style.textAlign = "left";
        sec_cell.appendChild(form.security_type);
        form.container.appendChild(sec_cell);

        form.ticker = document.createElement("input");
        form.ticker.type = "text";

        let ticker_cell = document.createElement("td");
        ticker_cell.style.textAlign = "left";
        ticker_cell.appendChild(form.ticker);
        form.container.appendChild(ticker_cell);

        form.price = document.createElement("input");
        form.price.type = "text";
        form.price.style.textAlign = "right";

        let price_cell = document.createElement("td");
        price_cell.style.textAlign = "right";
        price_cell.appendChild(form.price);
        form.container.appendChild(price_cell);

        form.shares = document.createElement("input");
        form.shares.type = "text";
        form.shares.style.textAlign = "right";

        let shares_cell = document.createElement("td");
        shares_cell.style.textAlign = "right";
        shares_cell.appendChild(form.shares);
        form.container.appendChild(shares_cell);

        form.purchase_date = document.createElement("input");
        form.purchase_date.type = "date";
        form.purchase_date.classList.add("no_future_inputs");

        let date_cell = document.createElement("td");
        date_cell.style.textAlign = "right";
        date_cell.appendChild(form.purchase_date);
        form.container.appendChild(date_cell);

        form.cost_basis = document.createElement("input");
        form.cost_basis.type = "text";
        form.cost_basis.style.textAlign = "right";

        let cost_basis_cell = document.createElement("td");
        cost_basis_cell.style.textAlign = "right";
        cost_basis_cell.appendChild(form.cost_basis);
        form.container.appendChild(cost_basis_cell);

        form.save = makeButton("btn-success", "Save", saveFunc);
        let save_cell = document.createElement("td");
        save_cell.style.textAlign = "center";
        save_cell.appendChild(form.save);
        form.container.appendChild(save_cell);

        form.cancel = makeButton("btn-danger", "Cancel", cancelFunc);
        let cancel_cell = document.createElement("td");
        cancel_cell.style.textAlign = "center";
        cancel_cell.appendChild(form.cancel);
        form.container.appendChild(cancel_cell);

        return form;
    }

    const renderPortfolioForm = (saveFunc, cancelFunc) => {
        let form = {};

        let type_options = ["IRA", "401K", "Savings"]; // TODO: replace with list fetched from DB
        form.container = document.createElement("div");
        form.container.classList.add("portfolio-creation");

        let name_label = document.createElement("label");
        name_label.innerText = "Name";
        form.name = document.createElement("input");
        form.name.type = "text";

        let account_type_label = document.createElement("label");
        account_type_label.innerText = "Account Type";
        form.account_type = makePickList(type_options);

        let balance_label = document.createElement("label");
        balance_label.innerText = "Balance";
        form.balance = document.createElement("input");
        form.balance.type = "number";
        form.balance.min = "0.01";
        form.balance.step = "0.01";

        let description_label = document.createElement("label");
        description_label.innerText = "Description";
        form.description = document.createElement("textarea");
        form.description.maxLength = 250;

        let buttonGroupSubmit = document.createElement("div");
        buttonGroupSubmit.classList.add("btn-group");

        let buttonGroupCancel = document.createElement("div");
        buttonGroupCancel.classList.add("btn-group");

        form.submit = makeButton("btn-success", "Submit", saveFunc);
        form.submit.classList.add("mr-2");
        let cancel = makeButton("btn-danger", "Cancel", cancelFunc);
        cancel.classList.add("mr-2");

        let title = document.createElement("h2");
        title.innerText = "Manage Portfolio";

        form.container.appendChild(title);
        form.container.appendChild(name_label);
        form.container.appendChild(form.name);
        form.container.appendChild(account_type_label);
        form.container.appendChild(form.account_type);
        form.container.appendChild(balance_label);
        form.container.appendChild(form.balance);
        form.container.appendChild(description_label);
        form.container.appendChild(form.description);
        form.container.appendChild(document.createElement("br"));

        buttonGroupSubmit.appendChild(form.submit);
        buttonGroupCancel.appendChild(cancel);

        form.container.appendChild(buttonGroupSubmit);
        form.container.appendChild(buttonGroupCancel);

        //form.container.appendChild(form.submit);
        //form.container.appendChild(cancel);

        return form;

    }

    const renderCreateButton = () => {
        let createPortfolio = makeButton("btn-success", "Create Portfolio", () => {
            handlePortfolioCreate(createPortfolio);
        });
        return createPortfolio;
    }

    const render = () => {
        portfolio_listing.innerHTML = "";
        all_portfolios = [];
        numPortfolios = 0;

        portfolio_listing.appendChild(error);
        portfolio_listing.appendChild(modal);
        portfolio_listing.appendChild(renderCreateButton());

        portfolio_listing.appendChild(document.createElement("p"));

        get_all_portfolios(handleUserPortfolios, error);
    };

    render();

    return portfolio_listing;
}