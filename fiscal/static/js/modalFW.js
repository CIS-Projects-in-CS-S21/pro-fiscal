/**
 * Function that creates a modal display component
 * @typedef {{className: string, hideClass: string, showClass: string}} Params
 * @param {Params} params The parameter object containing optional class names to be applied
 * @returns {HTMLDivElement}
 */
function modalFW(params) {
    var className = params.className || "modal";
    var hideClass = params.hideClass || "modal-hide";
    var showClass = params.showClass || "modal-show";
    
    function hide(elem){
        elem.classList.add(hideClass);
        elem.style.display = "none";
    }
    
    function show(elem){
        elem.classList.remove(hideClass);
        elem.style.display = "block";
    }
    
    var modal = document.createElement("div");
    modal.classList.add(className);
    hide(modal);

    /**
     * Function to display a message in the modal component
     * @param {string} message - The string to be displayed, HTML string is accepted.
     */
    modal.alert = function(message){
        modal.innerHTML = "";
        
        var messageArea = document.createElement("div");
        
        var messageText = document.createElement("p");
        messageArea.appendChild(messageText);
        messageText.innerText = message;
        
        var exitButton = document.createElement("button");        
        exitButton.innerText = "OK";
        exitButton.onclick = function(){
            hide(modal);
        };
                
        messageArea.appendChild(exitButton);
        modal.appendChild(messageArea);        
        
        show(modal);
        
    };

    /**
     * Function to display a confirmation modal
     * @param {string} message - The string to be displayed, HTML string is accepted.
     * @param {function} callBack - A function to be invoked if the ok button is clicked
     */
    modal.confirm = function(message, callBack){
        modal.innerHTML = "";
        
        var messageArea = document.createElement("div");
        modal.appendChild(messageArea);
        
        var messageText = document.createElement("p");
        messageArea.appendChild(messageText);
        messageText.innerHTML = message;
        
        var okButton = document.createElement("INPUT");
        okButton.setAttribute("type", "button");
        okButton.setAttribute("value", "OK");
        okButton.onclick = function(){
            hide(modal);
            callBack();
        };
        messageArea.appendChild(okButton);
        
        var cancelButton = document.createElement("INPUT");
        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("value", "Cancel");
        cancelButton.onclick = function(){
            hide(modal);
        };
        
        messageArea.appendChild(cancelButton);        
        show(modal);
    };

    modal.renderErrorMessages = function (elements) {
        modal.innerHTML = "";
        
        var messageArea = document.createElement("div");
        modal.appendChild(messageArea);

        let errorHeader = document.createElement('h2');
        errorHeader.innerText = "Errors";
        messageArea.appendChild(errorHeader);

        for (let i = 0; i < elements.length; i++) {
            let elem = document.createElement("p");
            elem.innerText = elements[i];
            messageArea.appendChild(elem);
            messageArea.appendChild(document.createElement("br"));
        }

        var closeBtn = document.createElement("INPUT");
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("value", "Close");
        closeBtn.classList.add("btn", "btn-info");
        closeBtn.onclick = function(){
            hide(modal);
        };
        
        messageArea.appendChild(closeBtn);

        show(modal);
    }

    /**
     * A function to display a modal containing a DOM element
     * @param {Node} element - The DOM element to be displayed in the modal
     */
    modal.displayElement = function(element){
        modal.innerHTML = "";
        
        var messageArea = document.createElement("div");
        messageArea.appendChild(element);
        
        var exitButton = document.createElement("button");        
        exitButton.innerHTML = "OK";
        exitButton.onclick = function(){
            hide(modal);
        };
        
                
        messageArea.appendChild(exitButton);
        modal.appendChild(messageArea);        
        
        show(modal);
        
    };
    
    return modal;    
}