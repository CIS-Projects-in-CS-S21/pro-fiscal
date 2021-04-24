/**
 * Function to create a dropdown list of items that the user can select as an input
 * @param {Array} optionList List of strings that corresponds to the user's options
 * @returns {HTMLSelectElement} An element that enables users to select an item
 */
function makePickList(optionList) {
    let list = document.createElement("select");
    for (item in optionList) {
        let option = document.createElement("option");
        option.value = optionList[item];
        option.innerText = optionList[item];
        list.appendChild(option);
    }
    return list;
}