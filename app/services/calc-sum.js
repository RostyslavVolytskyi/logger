var fs = require('fs');
let moment = require('moment');

let hourAgo;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const calculateSum = (url) => {
    const file = fs.readFileSync('access.log', {encoding: 'utf-8'});
    const lines = file.split(/\r?\n/);
    hourAgo = moment.utc().subtract(1, 'hours');
    const lastHourLogs = lines.filter(lastHourResults);
    return lastHourLogs
        .filter(log => log.includes(url))
        .map(log => betweenCurlyBraces(log))
        .filter(Boolean)
        .map(payload => payload.value)
        .reduce(reducer)
};

function lastHourResults(line) {
    const logDate = betweenBrackets(line);
    if (moment(logDate).isSameOrAfter(hourAgo)) {
        return line;
    }
}

function betweenCurlyBraces(line) {
    const regex = /\{([^}]+)\}/g;
    const found = line.match(regex);
    if (found) {
        console.log(JSON.parse(found[0]));
        return JSON.parse(found[0]);
    }
}

function betweenBrackets(line) {
    const regex = /\[([^}]+)\]/g;
    const found = line.match(regex);
    if (found) {
        return found[0].substring(1, found[0].length-1);
    }
}

module.exports = {
    calculateSum
};
