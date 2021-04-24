/**
 * Function that checks if a string is a valid username for Django's REST Auth API (Letters, digits and @/./+/-/_ only)
 * @param {string} username The inputted username
 * @returns {string} Returns null if the username is not a valid username, and the username otherwise
 */
function usernameValidation (username) {
    var regex = /^[A-Za-z0-9@.+_-]+$/;

    if (regex.test(username)) {
        return username;
    }
    return null;
}