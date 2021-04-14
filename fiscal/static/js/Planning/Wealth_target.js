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

        let item = document.getElementById("presentValue");
        item.value = formatter.format(results);
    }

    const inputContent = [
        {
            inputText: "Enter the amount of money that you want to have at the retirement (F): ",
            actualFunction: (e) => {
                if (isNaN(e.target.value) || e.target.value.length > 7) {
                    e.target.value = e.target.value.slice(0, -1)
                }
            }, type: "text", inputId: "TotalIncome", disabled: false
        },
        {
            inputText: "Enter the interest rate at the given time period (r): ",
            actualFunction: (e) => {
                if (isNaN(e.target.value) || e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, -1)
                }
            }
            , type: "text", inputId: "Rate", disabled: false
        },
        {
            inputText: "Enter the number of years that you have before you can retire (n): ",
            actualFunction: (e) => {
                if (isNaN(e.target.value) || e.target.value.length > 7) {
                    e.target.value = e.target.value.slice(0, -1)
                }
            }
            , type: "text", inputId: "time", disabled: false
        },
        {
            inputText: "Present Value to save to attain your Future Value (P): ",
            actualFunction: (e) => {

            }
            , type: "text", inputId: "presentValue", disabled: true
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
            <li>You will also input the interest rate (r) and the number of years that you have before you can retire (n).</li>
            <li>By clicking the calculate button, you can see how much wealth is needed to be prepared for retirement (P).</li>
            <li>Equation for wealth target calculator: P = F/((1+r)^n). </li>
        </ul>
    `
    FormWealth.appendChild(formParagraph);


    let userInfo = document.createElement("user-info");
    userInfo.classList.add("wealth-inputs");
    let wealthDiv = document.createElement("div");
    wealthDiv.id = "wealth";
    inputContent.forEach(input => {
        const label = document.createTextNode(input.inputText);
        const actual = document.createElement("input");
        actual.id = input.inputId;
        actual.type = input.type;
        actual.addEventListener("input", input.actualFunction);
        actual.disabled = input.disabled;
        wealthDiv.appendChild(label);
        wealthDiv.appendChild(actual);
    });

    wealthDiv.appendChild(document.createElement("br"));

    const submitIcon = document.createElement("button");
    submitIcon.id = "submitForm";
    submitIcon.innerHTML = "calculate";
    submitIcon.addEventListener("click", submitWealth);
    wealthDiv.appendChild(submitIcon);

    userInfo.appendChild(wealthDiv);

    FormWealth.appendChild(userInfo);

    return FormWealth;
}