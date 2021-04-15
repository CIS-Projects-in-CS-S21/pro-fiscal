/**
 * Function that is used to create button elements.
 * @typedef {{type: string, text: string, onclickhandler: Function}} Params
 * @param {Params} params The parameter object containing information about how to create the button element.
 * @returns {HTMLButtonElement} A button created using the inputted configurations.
 */
function createButton(params) {
    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");

    button.classList.add(params.type || "btn-primary");
    button.innerText = params.text || "Name";

    let handler = params.onclickhandler || dud_function;

    button.addEventListener("click", handler);

    return button;
}