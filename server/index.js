// *** main dependencies *** //
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

// *** routes *** //
var routes = require('./routes/index.js');

app.set('port', process.env.PORT || 5000);

// *** express instance *** //
var app = express();

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

// *** main routes *** //
app.use('/', routes);

// *** server config *** //
var server   = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log("Node server running on http://localhost:2000");
});

module.exports = app;