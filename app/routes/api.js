var fs = require('fs');

module.exports = (express) => {

    let api = express.Router();

    api.get('/*/sum', (req, res) => {
        const url = req.url;
        const file = fs.readFileSync('access.log', {encoding: 'utf-8'});
        console.log(file.split(/\r?\n/));

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
