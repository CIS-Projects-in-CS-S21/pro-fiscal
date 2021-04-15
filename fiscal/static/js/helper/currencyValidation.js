/**
 * Function that checks if a value is a valid US currency number
 * @param {string} value (Subjective, as this can also be a number)
 * @returns {string} Returns null if the value is not a valid currency, and the value otherwise
 */
function currencyValidation(value) {
    var regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    
    if (regex.test(value)) {
        return value;
    }
    return null;
}