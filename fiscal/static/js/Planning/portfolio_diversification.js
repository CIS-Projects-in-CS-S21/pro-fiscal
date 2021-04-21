/**
 * Function that renders a pie chart highlighting the diversification of a user's portfolio.
 * @returns {Chart}
 */
function render_portfolio_diversification() {
    var contents = document.createElement("div");
    let header = document.createElement("h3");
    header.innerText = "Your Portfolios - Diversification"; // Username here
    let error = document.createElement("p");
    contents.style.textAlign = "center";
    contents.appendChild(header);
    contents.appendChild(error);

    const COLOR_OPTIONS = [
        "rgb(0, 63, 92)",
        "rgb(188, 80, 144)",
        "rgb(255, 166, 0)",
        "rgb(239, 86, 117)",
        "rgb(59, 122, 46)",
        "rgb(88, 80, 141)",
        "rgb(137, 78, 116)",
        "rgb(237, 130, 85)",
        "rgb(133, 85, 237)",
        "rgb(133, 237, 85)",
    ];

    //Function that grabs JSON object
    const getDiversificationData = () => {
        var url = "/planning/portfolio/"
        var init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                'Authorization': "token " + localStorage.getItem("key")
            }
        }

        fetch(url, init)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.length == 0){
                    throw new Error("You have no portfolios");
                }
                // console.log(data);
                const dataSet = createDataset(data);
                createPieChart(dataSet);
            }).catch((msg) => {
                error.innerHTML += msg + '<br>';
        });
    }

    //Function takes in dataset and totals all values from a user's account(s) based on security type. This is done
    //for every security type a user has in their holding(s).
    const createDataset = (dataset) => {
        const combinedDataset = {};

        dataset.forEach((account) => {
            if(account.holdings.length > 0) {
                let current = account.holdings;
                for(let i = 0; i < current.length; i++){
                    if(combinedDataset[current[i].security_type]){
                        combinedDataset[current[i].security_type] += current[i].price * current[i].shares
                    }
                    else{
                        combinedDataset[current[i].security_type] = current[i].price * current[i].shares
                    }
                }
            }
            else{
                error.innerHTML += "Could not add " + account.name + "<br>";
            }
        });

        return {"labels": Object.keys(combinedDataset), "values": Object.values(combinedDataset)}
    }

    //Actual function that creates the pie chart using ChartJS.
    function createPieChart(dataSet) {
        var ctx = document.getElementById("myChart").getContext("2d");

        var chart = new Chart(ctx, {
            // The type of chart we want to create

            // The data for our dataset

            type: "doughnut",
            data: {
                labels: dataSet.labels,
                datasets: [{data: dataSet.values, backgroundColor: COLOR_OPTIONS}],

            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'top',
                    labels: {
                        fontSize: 18
                    }
                },
                tooltips: {
                    callbacks: {
                        label: (val, data) => {
                            let total = 0;
                           data.datasets[val.datasetIndex].data.forEach(data => {
                               total += data
                           } )
                            return (`${(data.datasets[val.datasetIndex].data[val.index].toLocaleString('en-US', { style: 'currency', currency: 'USD' }))} - ${Math.floor((data.datasets[val.datasetIndex].data[val.index]/total) * 100)}%`)
                        }

                    }
                }
            }

        })

        // Used to remove the Chart when we exit out of the Portfolio Growth Page
        function removeChart() {
            chart.destroy();
        }

        window.addEventListener("hashchange", removeChart);
    }

    getDiversificationData();

    return contents;
}