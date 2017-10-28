var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'quizzzyDB'
});

connection.connect(function() {
    console.log("Database connected");
});

module.exports.findAll = function() {
    return new Promise(function(resolve, c) {
        connection.query("SELECT * FROM users ORDER BY id DESC", function(err, rows, fields) {
            if (err) {
                return resolve(err);
            }
            resolve(rows);
        });
    })
}


module.exports.addUser = function(data, callback) {
    connection.query("INSERT INTO users SET ?", data, callback);
}

module.exports.deleteUser = function(idUser, callback) {
    connection.query("DELETE FROM users WHERE id = ?", idUser, callback);
}

module.exports.findByUsername = function(username, callback) {
    connection.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
}

module.exports.encrypt = function(data, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, callback);
    })
}

module.exports.compare = function(hash, password, callback) {
    return (bcrypt.compareSync(password, hash)) ? true : false;
}

module.exports.getTasks = () => {
    return new Promise((resolve, reject) => {
        connection.query(`select json_object(
            'id',  questions.id,
            'question', question,
            'answers', json_array(
                               (select GROUP_CONCAT(
                               "\`", 
                                          json_object('answer',answer,'isTrue', isTrue), "\`"
                                       )   
                                from answers 
                                where answers.id_question = questions.id))
                             ) as tasks
           from questions;`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}