/**
 * Function that is used to create button elements.
 * @param {Object} params Object containing the desired Bootstrap button styling for the button, the associated text for the button,
 * and the function that will be called upon clicking the button.
 * @returns {DomElement} A button created using the inputted configurations.
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