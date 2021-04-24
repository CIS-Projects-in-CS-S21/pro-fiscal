/**
 * The different configurations of the Routing Framework.
 * @typedef {Object} RouteParameters
 * @property {Array} routeArray - List of links to access throughout the website.
 * @property {string} contentID - Div component to render the components of the different pages in.
 * @property {string} startLink - Link that the user will start out in.
 */

/**
 * A function that changes which components are rendered onto the page based on the page's hash.
 * @function
 * @param {RouteParameters} params The parameter object containing information about how to route the different pages.
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