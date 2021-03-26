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