var express = require('express');
var bodyParser = require('body-parser');

// Initialize Express App
var app = express();

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Set Static Path
app.use('/', express.static(__dirname));

// Import API Routes
app.use(require('./api'));

port = process.env.PORT || 8081;

app.listen(port, function() {
    console.log("listening to port " + port);
})