/**
 * 
 * @returns {DOMElement} The element that will be displayed onto the Wealth Target Calculator page.
 */
function render_wealthTarget_interface() {

    /**
     * Function that collects the user's inputs, and renders the present value P into the page.
     */
    const submitWealth = () => {
        const futureValue = parseFloat(document.getElementById("TotalIncome").value);
        const InterestRate = parseFloat(document.getElementById("Rate").value);
        const TimePeriod = parseFloat(document.getElementById("time").value);
        //send to backend here

        //change values of input to null
        /*
        document.getElementById("TotalIncome").value = null;
        document.getElementById("Rate").value = null;
        document.getElementById("time").value = null;
        console.log(futureValue, InterestRate, TimePeriod);
        */

        let params = {
            "wealth_target_inputs": {
                "target_wealth": futureValue,
                "annual_return": InterestRate,
                "num_years": TimePeriod
            },
            "date": new Date()
        }

        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        let results = wealth_target_calculate(params);

        outputAnswer.innerText = formatter.format(results);
    }

    const inputContent = [
        {
            inputText: "Enter the amount of money that you want to have at retirement (F): ",
            actualFunction: (e) => {
                if (isNaN(e.target.value) || e.target.value.length > 7) {
                    e.target.value = e.target.value.slice(0, -1)
                }
            }, type: "text", inputId: "TotalIncome"
        },
        {
            inputText: "Enter the annual expected rate of return (r): ",
            actualFunction: (e) => {
                if (isNaN(e.target.value) || e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, -1)
                }
            }
            , type: "text", inputId: "Rate"
        } ,
        {
            inputText: "Enter the number of years that you have before you can retire (n): ",
            actualFunction: (e) => {
                if (isNaN(e.target.value) || e.target.value.length > 7) {
                    e.target.value = e.target.value.slice(0, -1)
                }
            }
            , type: "text", inputId: "time"
        }
    ];

    let FormWealth = document.createElement("div");
    let formParagraph = document.createElement("p");
    formParagraph.classList.add("form-wealth");
    formParagraph.innerHTML = `
        <h1>Wealth Target Calculator</h1>
        <ul>
            <li>The wealth target calculator is a tool that calculates how much wealth you are going to need to be ready for retirement.</li>
            <li>You will input how much money do you want to have at the point of your retirement (F). </li>
            <li>You will also input the annual expected rate of return for your investments (r) and the number of years that you have before you can retire (n).</li>
            <li>By clicking the calculate button, you can see how much wealth is needed to be prepared for retirement (P).</li>
            <li>Equation for wealth target calculator: P = F/((1+(r/100))^n). </li>
        </ul>
    `
    FormWealth.appendChild(formParagraph);

    let userInfo = document.createElement("div");
    userInfo.classList.add("wealth-inputs");
    let wealthDiv = document.createElement("div");
    wealthDiv.id = "wealth";
    inputContent.forEach(input => {
        const label = document.createTextNode(input.inputText);
        const actual = document.createElement("input");
        actual.id = input.inputId;
        actual.type = input.type;
        actual.addEventListener("input", input.actualFunction);
        wealthDiv.appendChild(label);
        wealthDiv.appendChild(actual);
    });

    wealthDiv.appendChild(document.createElement("br"));

    const submitIcon = document.createElement("button");
    submitIcon.id = "submitForm";
    submitIcon.innerHTML = "calculate";
    submitIcon.addEventListener("click", submitWealth);
    wealthDiv.appendChild(submitIcon);


    let outputBox = document.createElement("div");
    outputBox.classList.add("wealthResult");

    let outputTitle = document.createElement("h3");
    outputTitle.innerText = "Wealth Calculator Results";
    outputTitle.classList.add("text-center");
    outputBox.appendChild(outputTitle);

    let outputBoxDiv = document.createElement("div");
    outputBoxDiv.classList.add("row");

    let outputLabel = document.createElement("div");
    outputLabel.innerText = "Present Value required to attain your Future Value";
    outputLabel.classList.add("col", "text-center");

    let outputAnswer = document.createElement("div");
    outputAnswer.innerText = "$0.00";
    outputAnswer.classList.add("col", "text-center", "wealthAnswer");

    outputBoxDiv.appendChild(outputLabel);
    outputBoxDiv.appendChild(outputAnswer);

    outputBox.appendChild(outputBoxDiv);

    userInfo.appendChild(wealthDiv);

    FormWealth.appendChild(userInfo);
    FormWealth.appendChild(document.createElement("br"));
    FormWealth.appendChild(outputBox);

    return FormWealth;
}