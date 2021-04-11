function home () {
    let elem = document.createElement("div");

    let title = document.createElement("h3");
    title.innerText = "Welcome to Fiscal's Home Page. Please use the Sidebar to access our different tools.";

    elem.appendChild(title);
    /*
    elem.appendChild(modal);

    modal.alert("Welcome to Fiscal");
    */

    return elem;
}