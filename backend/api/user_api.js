var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

// Import User Module Containing Functions Related To User Data
var user = require('../models/user');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// API Routes
app.get('/', function(req, res) {

    user.findAll(function(err, rows, fields) {
        //if(err) throw err;
        res.json(rows);
    })
});


app.post('/authenticate', async function(req, res, next) {
    let params = req.body;
    let users = null;
    users = await user.findAll();
    console.log(users); // Ok, data is here
});


app.post('/adduser', function(req, res, next) {

    var data = req.body;
    console.log(data);
    user.findByUsername(data.username, function(err, rows, fields) {
        if (rows.length == 1) {
            user.sendResponse(false, res);
        } else {
            user.encrypt(data, function(err, hash) {
                data = {
                    username: data.username,
                    hashedpassword: hash
                };
                user.addUser(data, function(err, info) {
                    //if(err) throw err;
                    console.log(info);
                    user.sendResponse(true, res);
                });
            });
        };
    });
});

app.delete('/deluser/:id', function(req, res, next) {
    user.deleteUser(req.params.id, function(err, info) {
        if (err) throw err;
        console.log(info);
        user.sendResponse(true, res);
    });
});


module.exports = app;