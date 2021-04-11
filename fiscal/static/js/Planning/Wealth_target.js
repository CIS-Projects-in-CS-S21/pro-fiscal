/**
 * Function that calculates the wealth target value.
 * @param {float} desired_income Amount that would be received by the user within a specific time.
 * @param {float} inflation_rate the percent that shows the change in prices-increase in prices and the value of a currency is falling.
 * @param {float} withdrawal_rate the rate at which the users withdraw money from their account.
 * @param {float} investment_return amount of money that the user would make or lost on an investment within a specific time.
 * @param {int} time Specified period in which user’s activity occurs.
 * @returns {float} user's total wealth target value.
 * @throws {InvalidArgumentException} if the user enters invalid data or number
 */
function calculate_target (desired_income, inflation_rate, withdrawal_rate, investment_return, time) {

}
function render_wealthTarget_interface(){

const submitWealth = () => {
 const futureValue = parseFloat(document.getElementById("TotalIncome").value);
 const InterestRate = parseFloat(document.getElementById("Rate").value);
 const TimePeriod = document.getElementById("time").value;
 //send to backend here

 //change values of input to null
 document.getElementById("TotalIncome").value = null;
 document.getElementById("Rate").value = null;
 document.getElementById("time").value = null;
 console.log(futureValue,InterestRate, TimePeriod)


}
const inputContent = [
    {inputText :"Enter the amount of money that you want to have at the retirement (F): ",
    actualFunction : (e)=>{
            if(isNaN(e.target.value) || e.target.value.length >7){
                e.target.value = e.target.value.slice(0, -1)
            }
    },type : "text", inputId : "TotalIncome"},
    {inputText : "Enter the interest rate at the given time period (r): ",
    actualFunction : (e)=>{
            if(isNaN(e.target.value) || e.target.value.length >3 ){
                e.target.value = e.target.value.slice(0, -1)
            }
    }
    ,type:"text",inputId : "Rate"},
    {inputText:"Enter the number of years that you have before you can retire (n): ",
    actualFunction : (e)=>{
            if(isNaN(e.target.value) || e.target.value.length >7){
                e.target.value = e.target.value.slice(0, -1)
            }
    }
    ,type: "text",inputId : "time"}
    ]



let FormWealth = document.createElement("div");
        let formParagraph = document.createElement("p");
        formParagraph.classList.add("form-wealth");
        formParagraph.innerHTML = `
        <h1>Wealth Target Calculator</h1>
        <ul>
            <li>The wealth target calculator is a tool that calculates how much wealth you are going to need to be ready for retirement.</li>
            <li>You will input how much money do you want to have at the point of your retirement (F). </li>
            <li>You will also input the interest rate (r) and the number of years that you have before you can retire (n).</li>
            <li>By licking the calculate button, you can see how much wealth is needed to be prepared for retirement (P).</li>
            <li>Equation for wealth target calculator: P = F/((1+r)^n). </li>
        </ul>
    `
        FormWealth.appendChild(formParagraph);


let userInfo = document.createElement("user-info");
    userInfo.classList.add("wealth-inputs");
    let wealthDiv = document.createElement("div");
    wealthDiv.id = "wealth";
inputContent.forEach(input =>{
        const label = document.createTextNode(input.inputText);
        const actual = document.createElement("input");
        actual.id = input.inputId;
        actual.type = input.type;
        actual.addEventListener("input",input.actualFunction)
        wealthDiv.appendChild(label);
        wealthDiv.appendChild(actual);
    })
    const submitIcon = document.createElement("button");
    submitIcon.id = "submitForm";
    submitIcon.innerHTML = "calculate";
    submitIcon.addEventListener("click", submitWealth)
    wealthDiv.appendChild(submitIcon);



    userInfo.appendChild(wealthDiv);

    FormWealth.appendChild(userInfo);


         return FormWealth;
}





