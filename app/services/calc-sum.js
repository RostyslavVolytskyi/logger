var fs = require('fs');
let moment = require('moment');

let hourAgo;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const calculateSum = (url) => {
    const file = fs.readFileSync('access.log', {encoding: 'utf-8'});
    hourAgo = moment.utc().subtract(1, 'hours');
    return file
        .split(/\r?\n/)
        .filter(lastHourResults)
        .filter(log => log.includes(url))
        .map(betweenCurlyBraces)
        .filter(Boolean)
        .map(payload => payload.value)
        .reduce(reducer)
};

function lastHourResults(line) {
    const logDate = betweenBrackets(line);
    if (moment(logDate).isSameOrAfter(hourAgo)) return line;
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
