var fs = require('fs');
let moment = require('moment');

const calculateSum = (url) => {
    console.log(url);
    const file = fs.readFileSync('access.log', {encoding: 'utf-8'});
    const lines = file.split(/\r?\n/);
    console.log(lines);
    lines.forEach( line => {
        betweenBrackets(line);
        betweenCurlyBraces(line);
    })
};

function betweenCurlyBraces(line) {
    const regex = /\{([^}]+)\}/g;
    const found = line.match(regex);
    if (found) {
        console.log(JSON.parse(found[0]));
    }
}

function betweenBrackets(line) {
    const regex = /\[([^}]+)\]/g;
    const found = line.match(regex);
    if (found) {
        const strDate = found[0].substring(1, found[0].length-1);
        console.log(strDate);
    }
}

module.exports = {
    calculateSum
};
