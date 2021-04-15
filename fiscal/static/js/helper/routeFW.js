/**
 * Function that changes which components are rendered onto the page based on the page's hash.
 * @typedef {{routeArray: Array, contentID: string, startLink: string}} Params
 * @param {Params} params Configurations to change the components rendered on the page, and failure options should an error occur.
 */
function routeFW(params) {
    let contentID = params.contentID || "content";
    let startLink = params.startLink || "#/home";

    if (!params.routeArray || params.routeArray[0]) {
        alert("Invalid array 'routeArray' used for parameter object.");
        return;
    }

    const routingTable = params.routeArray;

    function inject(item) {
        let target = document.getElementById(contentID);
        target.innerHTML = "";
        target.appendChild(item);
    }

    function parsePath(path) {
        let obj = {
            param: "",
            funcName: path
        };

        let n = path.lastIndexOf("/");

        if (n > 1) {
            obj.param = path.substring(n + 1);
            obj.funcName = path.substring(0, n);
        }

        return obj;
    }

    function route() {
        let path = location.hash;

        let unknown;
        let pathObj = parsePath(path);

        if (!routingTable[pathObj.funcName]) {
            unknown = document.createElement("div");
            unknown.innerHTML = "<p>This page has not been developed yet. Please look forward to it once we finish development on it.</p>";
        } else if (pathObj.param.length > 0) {
            unknown = routingTable[pathObj.funcName](pathObj.param);
        } else {
            unknown = routingTable[pathObj.funcName]();
        }

        inject(unknown);
    }

    window.addEventListener('hashchange', route);
    location.hash = "Test";
    location.hash = startLink;
}