/**
 * Function that calculates the number of days in between the inputted dates
 * @param {Date} curr_date The current Date
 * @param {Date} start_date The starting Date
 * @returns {int} Denotes how many days has passed from start_date to curr_date
 */
function days_after_update (curr_date, start_date) {
    return parseInt((curr_date - start_date) / (1000 * 60 * 60 * 24), 10);
};
// module.exports = days_after_update;