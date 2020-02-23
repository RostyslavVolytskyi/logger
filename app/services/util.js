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

module.exports = {
    betweenCurlyBraces,
    betweenBrackets
};