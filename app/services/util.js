const betweenCurlyBraces = line => {
    const regex = /\{([^}]+)\}/g;
    const found = line.match(regex);
    if (found) return JSON.parse(found[0]);
}

const betweenBrackets = line => {
    const regex = /\[([^}]+)\]/g;
    const found = line.match(regex);
    if (found) return found[0].substring(1, found[0].length-1);
}

const roundValue = req => {
    const {value} = req.body;
    return !isNaN(value) ? {value: Math.round(value)} : {};
}

module.exports = {
    betweenCurlyBraces,
    betweenBrackets,
    roundValue
};