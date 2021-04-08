// Letters, digits and @/./+/-/_ only.

function usernameValidation (username) {
    var regex = /^[A-Za-z0-9@.+_-]+$/;

    if (regex.test(username)) {
        return username;
    }
    return null;
}