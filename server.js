const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const {roundValue} = require('./app/services/util');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./app/routes/api')(express);
const app  = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, config.fileName), { flags: 'a' });
morgan.token('body', (req, res, param) => JSON.stringify(roundValue(req)));
app.use(morgan('[:date[iso]] :method :url :body', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.use('/metrics', api);

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})