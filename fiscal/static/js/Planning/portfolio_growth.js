const d3 = require("../../../node_modules/d3");

function render_portfolio_growth() {

    const getPortfolioChangeData = () => {
        let portfolios = "";

        fetch("/static/json/portfolio_diversification.json")
            .then(response => {
                return response.json();
            })
            .then((data) => {
                portfolios = data;
            })
            .then(() => {
                handleUserPortfolios(portfolios);
            })
    }

    const handleUserPortfolios = (portfolios) => {
        console.log(portfolios);
    }

    getPortfolioChangeData();

    let contents = document.createElement("div");
    contents.innerText = "Testing Portfolio Growth";

    
    return contents;
}