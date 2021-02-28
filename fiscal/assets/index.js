import _ from 'lodash';

/**
 * A function that returns the contents of the base page. 
 * @constructor
 */
function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'lodash'], ' ');
    return element;
}

/**
 * Function that given a user's credentials, create a new account.
 * @param {string} username
 * @param {string} password
 * @param {string} password_verify
 * @returns {Promise} Promise object represents the status of the account
 * @throws Will throw an error if password and password_verify are not equal
 */

document.body.appendChild(component());