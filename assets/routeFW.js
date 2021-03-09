function routeFW (params) {
    let contentID = params.contentID || "content";
    let startLink = params.startLink || "#/home";

    if (!params.routeArray || params.routeArray[0]) {
        alert("Invalid array 'routeArray' used for parameter object.");
        return;
    }

    
}