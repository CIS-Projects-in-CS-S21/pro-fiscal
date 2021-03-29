function home () {
    let content = `
        <h2>Welcome to Fiscal!</h2>
    `;

    let elem = document.createElement("div");
    elem.innerHTML = content;

    return elem;
}