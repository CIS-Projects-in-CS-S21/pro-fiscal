function render_portfolio_growth() {
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
  const reduceDataset = (dataset) => {
    const currerntVal = [];

    dataset.forEach((newVal) => {
      const foundIndex =
        currerntVal &&
        currerntVal.findIndex((a) => a.security_type === newVal.security_type);

      if (foundIndex > -1) {
        currerntVal[foundIndex].price += newVal.price;
        currerntVal[foundIndex].shares += newVal.shares;
        currerntVal[foundIndex].total =
          currerntVal[foundIndex].price * currerntVal[foundIndex].shares;
      } else {
        currerntVal.push({
          security_type: newVal.security_type,
          price: newVal.price,
          shares: newVal.shares,
          total: newVal.price * newVal.shares,
        });
      }
    });

    return currerntVal;
  };

  const createDataset = (dataset) => {
    const combinedDataset = [];

    dataset.forEach((account) => {
      combinedDataset.push(...reduceDataset(account.holdings));
    });

    const finalDataset = reduceDataset(combinedDataset);

    const labels = finalDataset.reduce((labels, currentVal) => {
      if (!labels) {
        labels = [];
      }
      labels.push(currentVal.security_type);

      return labels;
    }, []);
    const values = finalDataset.reduce((labels, currentVal) => {
      if (!labels) {
        labels = [];
      }
      labels.push(currentVal.total);

      return labels;
    }, []);

    return { labels, values, finalDataset };
  };

  function createPieChart() {
    var ctx = document.getElementById("myChart").getContext("2d");

    return fetch("/static/json/portfolio_test.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const dataSet = createDataset(data.portfolio_accounts);

        var chart = new Chart(ctx, {
          // The type of chart we want to create

          // The data for our dataset

          type: "doughnut",
          data: {
            labels: dataSet.labels,
            datasets: [{ data: dataSet.values, backgroundColor: COLOR_OPTIONS }],

          },
                    options: {
        animate: true,
tooltips: {
      callbacks: {
          label:  (val, data) =>
             (`$${data.datasets[val.datasetIndex].data[val.index].toLocaleString()}`)

        }
        }}})

        // Used to remove the Chart when we exit out of the Portfolio Growth Page
        function removeChart() {
          chart.destroy();
        }

        window.addEventListener("hashchange", removeChart);
      });
  }

  let contents = document.createElement("h3");
  contents.innerText = "Your Portfolios - Diversification"; // Username here

  createPieChart();

  return contents;
}

