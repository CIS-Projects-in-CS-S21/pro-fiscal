/**
 * The different configurations of the Button.
 * @typedef {Object} ButtonParameters
 * @property {string} type - The button's Bootstrap styling.
 * @property {string} text - The button's text.
 * @property {function} onclickhandler - The function that the button executes when pressed.
 */

/**
 * A function for creating a button component on the page.
 * @function
 * @param {ButtonParameters} params The parameter object containing information about how to create the button element.
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