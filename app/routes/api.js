module.exports = (express) => {

    let api = express.Router();

    api.get('/smth', (req, res) => {
        res.send('hello there smth')
    });

    api.post('/*', (req, res) => {
        const {value} = req.body;
        res.send({value});
    })

    return api;
};
