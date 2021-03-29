function createButton (params) {
    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn");

    button.classList.add(params.type || "btn-primary");
    button.innerText = params.text || "Name";

    let handler = params.onclickhandler || dud_function;

    button.addEventListener("click", handler);

    return button;
}