let app = require('express')();
let collector = require('../collectors/user');

app.get('/', function(req, res) {
    collector.getUsers(function(err, rows, fields) {
        if(err) throw err;
        res.json(rows);
    })
});
    
app.post('/login', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    let params = req.body;
    let users = await collector.getUsers();

    console.log(params); // Ok, data is here

    let filteredUsers = users.filter(u => {
        return u.username === params.username &&
            collector.compare(u.password, params.password) &&
            u.role === params.role;
    });

    if (filteredUsers.length) {
        // if login details are valid return 200 OK with user details and fake jwt token
        let user = filteredUsers[0];
        res.json({
            id: user.id,
            username: user.username,
            role: user.role,
            token: 'fake-jwt-token'
        });

    } else {
        // else return 400 bad request
        res.statusMessage = "Username or password or role is incorrect";
        res.status(400).end();
    }
});

app.post('/signup', async function(req, res, next) {
    let newUser = req.body;
    console.log(newUser);
    let users = await collector.getUsers();

    let duplicateUser = users.filter(user => user.username === newUser.username).length;
    if (duplicateUser) {
        res.statusMessage = 'Username "' + newUser.username + '" is already taken';
        res.status(400).end();
    }

    //newUser.id = users.length + 1;
    console.log(newUser);
    collector.encrypt(newUser, function(err, hash) {
        newUser.password = hash;
        collector.addUser(newUser, function(err, info) {
            if (err) throw err;
            console.log(info);
            res.json({ success: true });
        })
    });
});


app.post('/adduser', function(req, res, next) {
    var data = req.body;
    console.log(data);
    collector.findByUsername(data.username, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.encrypt(data, function(err, hash) {
                data = {
                    username: data.username,
                    hashedpassword: hash
                };
                collector.addUser(data, function(err, info) {
                    if (err) throw err;
                    console.log(info);
                    res.json({ success: true });
                });
            });
        };
    });
});

app.delete('/deluser/:id', function(req, res, next) {
    collector.deleteUser(req.params.id, function(err, info) {
        if (err) throw err;
        console.log(info);
        res.json({ success: true });
    });
});

module.exports = app;