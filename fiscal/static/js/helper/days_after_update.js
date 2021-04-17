/**
 * 
 * @param {Date} curr_date The current Date
 * @param {Date} start_date The Date where the user first purchased the Portfolio
 * @returns {int} Denotes how many days has passed from start_date to curr_date
 */
function days_after_update (curr_date, start_date) {
    return parseInt((curr_date - start_date) / (1000 * 60 * 60 * 24), 10);
};
// 
module.exports = days_after_update;