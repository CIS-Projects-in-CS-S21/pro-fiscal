import _ from 'lodash';

/**
 * A function that returns the contents of the base page. 
 * @constructor
 */
function render_component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'lodash'], ' ');
    return element;
}

/**
 * A function that adjusts what is displayed on the page based on the url.
 * @param {string} route The route that will be used to adjust the page the website is on.
 * @throws Will throw an error if an invalid route is passed in.
 */
function routing_function(route) {

}

document.body.appendChild(render_component());