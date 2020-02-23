const {calculateSum} = require('../services/calc-sum');

module.exports = express => {

    let api = express.Router();

    api.get('/*/sum', (req, res) => {
        const url = req.url;
        const key = url.split('/')[1];
        const value = calculateSum(key);
        res.send({value});
    });

    api.post('/*', (req, res) => {
        res.send({});
    })

    return api;
};
