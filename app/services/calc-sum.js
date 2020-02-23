const fs = require('fs');
const moment = require('moment');
const config = require('../../config');
const {betweenCurlyBraces} = require('./util');
const {betweenBrackets} = require('./util');

let hourAgo;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const calculateSum = url => {
    const file = fs.readFileSync(config.fileName, {encoding: 'utf-8'});
    hourAgo = moment.utc().subtract(1, 'hours');
    return file
        .split(/\r?\n/)
        .filter(lastHourResults)
        .filter(log => log.includes(url))
        .map(betweenCurlyBraces)
        .filter(Boolean)
        .map(payload => payload.value)
        .reduce(reducer);
};

function lastHourResults(line) {
    const logDate = betweenBrackets(line);
    if (moment(logDate).isSameOrAfter(hourAgo)) return line;
}

module.exports = {
    calculateSum
};
