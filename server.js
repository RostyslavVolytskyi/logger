var express = require('express');
var path = require('path');
var config = require('./config');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
const api = require('./app/routes/api')(express);

var app  = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
morgan.token('body', (req, res, param) => JSON.stringify(req.body));
app.use(morgan('[:date[iso]] :method :url :body', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.use('/metrics', api);

var server = app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})