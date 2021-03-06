function makeSideNav(params) {
    
    //add public method
    
    /* Input params:
     *  formAction = what should be run when the form is submitted
     *  contentId = id of the div holding the contents of the webpage
     *  mainContent = HTML for the main page
     *  menuItems = items and links to be listed in the sideNav menu
     *  formName = name of the form
     *  formText = text to be displayed on form
     *  position = the position of the sideNav: left or right
     */
    
    // maked items and links an array of objects as input
    
    //set param values if not included
    var formAction = params.formAction || "search.php";
    var mainContent = params.mainContent || "<h2>SideNav Example</h2><p>You forgot your content!</p>";
    var formText = params.formText || "Search..";
    var formName = params.formName || "search";
    //boolean that is true if position is right
    var isRight = params.position === "right";
    //make menuItems var, fill with placeholder values if needed
    var menuItems;
    var links;
    if (!params.menuItems) {
        menuItems = ["You", "Need", "Menu", "Items"];
        links = ["#", "#", "#", "#"];
    } else {
        menuItems = [];
        links = [];
        for (var i = 0; i < params.menuItems.length; i++){
            menuItems[i] = params.menuItems[i].name;
            links[i] = params.menuItems[i].link;
        }
    }
    
    //create main div
    var container = document.createElement("div");
    
    //create menu div and populate fields
    var menu = document.createElement("div");
    menu.className = "sidenav";
    
    //set sidenav position via css style
    if (isRight) {
        menu.style.right = "0px";
    } else {
        menu.style.left = "0px";
    }
    
    //make menu button and populate fields
    var menuButton = document.createElement("a");
    menuButton.classList.add("closebtn");
    menuButton.href = "javascript:void(0)";
    menuButton.innerHTML = "&times;";
    
    //set menu button on click to close the sideNav
    menuButton.onclick = closeNav;
    
    //append menuButton to menu
    menu.appendChild(menuButton);
    
    //create search form
    var searchForm = document.createElement("form");
    searchForm.className = "search-container";
    searchForm.action = formAction;
    
    //create search input
    var searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = formText;
    searchInput.name = formName;
    
    //add input to form
    searchForm.appendChild(searchInput);
    
    //add form to sideNav
    menu.appendChild(searchForm);
    
    //populate menu items and links
    for (var i = 0; i < menuItems.length; i++) {
        var menuEle = document.createElement("a");
        menuEle.href = links[i];
        var menuEleText = document.createTextNode(menuItems[i]);
        menuEle.appendChild(menuEleText);
        menu.appendChild(menuEle);
    }
    
    //append menu to main div
    container.appendChild(menu);

    //create content area and populate fields
    var main = document.createElement("div");
    main.className = "main";
    
    //set transition via css style
    if (isRight) {
        main.style.transition = "margin-right 0.5s";
    } else {
        main.style.transition = "margin-left 0.5s";
    }
    
    //create span for openning sideNav
    var mainSpan = document.createElement("span");
    mainSpan.className = "mainSpan";
    mainSpan.innerHTML = "&#9776; open";
    
    //set span onclick to oepn sideNav
    mainSpan.onclick = openNav;
    
    //append main span to content area
    main.appendChild(mainSpan);
    
    //create div for the content of the webpage
    var mainHTML = document.createElement("div");
    
    //set innerHTML to mainContent
    mainHTML.innerHTML = mainContent;
    
    //append mainHTML to main div
    main.appendChild(mainHTML);
    
    //append content area to main div
    container.appendChild(main);
    
    //opens the sideNav
    function openNav() {
            menu.style.width = "250px";
            //set position via css style
            if (isRight) {
                main.style.marginRight = "250px";
            } else {
                main.style.marginLeft = "250px";
            }
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        }
    
    //closes the sideNav
    function closeNav() {
            menu.style.width = "0";
            //set position via css style
            if (isRight) {
                main.style.marginRight = "0px";
            } else {
                main.style.marginLeft= "0px";
            }
            document.body.style.backgroundColor = "white";
        }
    
    container.setContent = function(content) {
        mainHTML.innerHTML = content;
    };
    
    //returns container (main div)
    return container;
}