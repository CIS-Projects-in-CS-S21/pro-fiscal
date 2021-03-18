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
            unknown.innerHTML = "<p>Error: unknown link " + path + " is absent from the routing table.</p>";
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