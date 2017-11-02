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


app.post('/login', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    let params = req.body;
    let users = null;
    users = await user.findAll();

    console.log(params); // Ok, data is here

    let filteredUsers = users.filter(u => {
        return u.username === params.username &&
            user.compare(u.password, params.password) &&
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
    let users = null;
    users = await user.findAll();
    
    console.log(users);

    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
    if (duplicateUser) {
        res.statusMessage = 'Username "' + newUser.username + '" is already taken';
        res.status(400).end();
    }

    //newUser.id = users.length + 1;
    console.log(newUser);
    user.encrypt(newUser, function(err, hash) {
        newUser.password = hash;
        user.addUser(newUser, function(err, info) {
            if (err) throw err;
            console.log(info);
            user.sendResponse(true, res);
        })
    });
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

app.get('/get_tasks', async(req, res) => {
    let tasks = await user.getTasks();
    tasks = tasks.map(el => JSON.parse(el.tasks));
    console.log(tasks);
    tasks = tasks.map(el => {
        let answers = el.answers;
        answers = answers[0];
        answers = answers.slice(1,-1);
        answers = answers.split('`,`');
        answers = '{"answers":['.concat(answers, "]}");
        el.answers = JSON.parse(answers).answers;
        return el;
    });
    console.log(tasks);
    res.json(tasks);
});

app.get('/get_disc', async(req, res) => {
    let discs = await user.getDisc();
    res.json(discs);
});

app.post('/create_disc', (req, res) => {
    var data = req.body;
    user.findByDiscipline(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            user.sendResponse(false, res);
        } else {
            user.addDiscipline(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                user.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_disc', (req, res, next) => {
    var data = req.body;
    console.log(data);
    user.deleteDiscipline(data.id, function(err, info) {
        if (err) {
            console.log(err);
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        user.sendResponse(true, res);
    });
});

app.put('/edit_disc', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByDiscipline(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editDiscipline(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.get('/get_topics', async(req, res) => {
    let topics = await admin.getTopics();
    console.log(topics);
    res.json(topics);
});

app.post('/topics_by_disc', async(req, res) => {
    let data = req.body;
    console.log(data);
    let tasks = await admin.getTopics(data.id_discipline);
    console.log(tasks);
    res.json(tasks);
})

app.post('/create_topic', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByTopic(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addTopic(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_topic', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    admin.deleteTopic(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_topic', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findByTopic(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editTopic(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.delete('/delete_question', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    admin.deleteQuestion(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.post('/create_question', (req, res) => {
    let data = req.body;
    console.log(data); // {id_discipline, id_topic, question, answers}
    let question = {}, id_question, answers;
    question.id_topic = data.id_topic;
    question.question = data.question; // {id_topic, question}
    answers = data.answers;
    admin.findByQuestion(question.question, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addQuestion(question, function(err, info) {
                if (err) throw err;
                console.log(info);
                id_question = info.insertId;
                let insert_aswers = [];
                answers.forEach(el => el.id_question = id_question);
                answers.forEach(i => insert_aswers.push([i.id_question, i.answer, i.isTrue]))
                console.log(insert_aswers);
                admin.addAnswers(insert_aswers, function(err, info) {
                    if (err) throw err;
                    console.log(info);
                });
                admin.sendResponse(true, res);
            });
        };
    });
});

module.exports = app;