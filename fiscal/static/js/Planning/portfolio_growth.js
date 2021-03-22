function render_portfolio_growth() {

    let secType = [], balanceData = [];
    let security_types = {
      //Stocks
      "equity": 0,
      //Bonds
      "fixed_income": 0,
      "cash": 0,
      //reral estate
      "property": 0,
      "derivatives": 0,
      "other": 0
    };

    const createDynamicDatasets = (portfolios) => {
        let datasets = [];
        let colors = ['rgb(0, 63, 92)', 'rgb(188, 80, 144)', 'rgb(255, 166, 0)',
            'rgb(239, 86, 117)', 'rgb(59, 122, 46)', 'rgb(88, 80, 141)', 'rgb(137, 78, 116)',
            'rgb(237, 130, 85)', 'rgb(133, 85, 237)', 'rgb(133, 237, 85)'];

        for (let i = 0; i < portfolios.length; i++) {
            let item = portfolios[i];

            datasets.push({
                label: secType,
                backgroundColor: colors[i],
                borderColor: colors[i],
                data: chartBalanceData[i],
                order: (i + 1)
            });
        }

        return datasets;
    }


    const reduceDataset = (dataset) => {

  const currerntVal = [];

  dataset.forEach((newVal) => {

    const foundIndex = currerntVal && currerntVal.findIndex((a) => (a.security_type === newVal.security_type))

    if (foundIndex > -1) {
      currerntVal[foundIndex].price += newVal.price;
      currerntVal[foundIndex].shares += newVal.shares;
      currerntVal[foundIndex].total = currerntVal[foundIndex].price * currerntVal[foundIndex].shares
    } else {
      currerntVal.push({
        security_type: newVal.security_type,
        price: newVal.price,
        shares: newVal.shares,
        total: newVal.price * newVal.shares
      })
    }
  })

  return currerntVal
}

const createDataset = (dataset) => {
  const combinedDataset = []

  dataset.forEach((account) => {
    combinedDataset.push(...reduceDataset(account.holdings))
  })

  const finalDataset = reduceDataset(combinedDataset);

  const labels = finalDataset.reduce((labels, currentVal) => {
    if (!labels) {
      labels = []
    }
    labels.push(currentVal.security_type)

    return labels
  }, [])
  const values = finalDataset.reduce((labels, currentVal) => {
    if (!labels) {
      labels = []
    }
    labels.push(currentVal.total)

    return labels
  }, [])


  return {labels, values, finalDataset}

}


       function createPieChart() {
        var ctx = document.getElementById('myChart').getContext('2d');

        return fetch("/static/json/portfolio_test.json")
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                const dataSet = createDataset(data.portfolio_accounts)

        var chart = new Chart(ctx, {
            // The type of chart we want to create


            // The data for our dataset


            type: 'doughnut',
    data: {
                labels: dataSet.labels,
                datasets: [{data: dataSet.values}]
            },
        });

        // Used to remove the Chart when we exit out of the Portfolio Growth Page
        function removeChart() {
            chart.destroy();
        }

        window.addEventListener('hashchange', removeChart);
         })

    }


    let contents = document.createElement("h3");
    contents.innerText = "Your Portfolios - Diversification"; // Username here

    createPieChart()

    return contents;
}

/* 
datasets: [{
                    label: "MyTestAccount",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chartBalanceData[0],
                    order: 1
                }, {
                    label: "MyTestAccount2 - Electric Boogaloo",
                    backgroundColor: 'rgb(7, 47, 95)',
                    borderColor: 'rgb(7, 47, 95)',
                    data: chartBalanceData[1],
                    order: 2
                }]


*/