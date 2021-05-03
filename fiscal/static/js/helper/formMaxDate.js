/**
 * Function used to disable date inputs from the future
 * @param {string} className Class Name for the elements for the function to disable form inputs for future dates
 */
function formMaxDate (className) {
    $(function () {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        $('.' + className).attr('max', maxDate);
    });
}