function currencyValidation(value) {
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    
    if (regex.test(value)) {
        return value;
    }
    return null;
}