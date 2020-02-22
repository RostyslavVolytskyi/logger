const {calculateSum} = require('../services/calc-sum');

module.exports = (express) => {

    let api = express.Router();

    api.get('/*/sum', (req, res) => {
        const url = req.url;
        calculateSum(url);
        res.send(`get sum ${url}`);
    });

    api.get('/*', (req, res) => {
        const url = req.url;
        res.send(`get from random ${url}`);
    });

    api.post('/*', (req, res) => {
        const {value} = req.body;
        res.send({value});
    })

    return api;
};
