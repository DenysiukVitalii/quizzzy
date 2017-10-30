var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
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
            'topic_id', questions.id_topic,
            'topic', (select topics.name from topics where topics.id = questions.id_topic),
            'discipline', (select disciplines.name from  disciplines
                           where disciplines.id = (select topics.id_discipline from topics
                           where questions.id_topic = topics.id)),
            'question', question,
            'answers', json_array(
                               (select GROUP_CONCAT('\`', 
                                          json_object('answer',answer, 'isTrue', isTrue), '\`'
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

module.exports.getDisc = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM disciplines ORDER BY id ASC`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addDiscipline = function(data, callback) {
    connection.query("INSERT INTO disciplines SET ?", data, callback);
}

module.exports.deleteDiscipline = function(idDisc, callback) {
    connection.query(`DELETE FROM disciplines WHERE id = ${idDisc}`, callback);
}

module.exports.editDiscipline = function(data, callback) {
    connection.query(`UPDATE disciplines SET name = '${data.name}' WHERE id = ${data.id}`, callback);
}

module.exports.findByDiscipline = function(name, callback) {
    connection.query(`SELECT * FROM disciplines WHERE name = '${name}'`, callback);
}

module.exports.getTopics = (idDisc = '') => {
    let query;
    query = (idDisc) ?  `select topics.id, topics.name as 'topic'
                            from topics
                            join disciplines on topics.id_discipline = disciplines.id
                            where disciplines.id = ${idDisc}
                            order by topics.id asc;` :
                        `select topics.id, topics.name as 'topic', disciplines.name as 'discipline'
                            from topics
                            join disciplines on topics.id_discipline = disciplines.id
                            order by topics.id asc;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addTopic = function(data, callback) {
    connection.query("INSERT INTO topics SET ?", data, callback);
}

module.exports.deleteTopic = function(idTopic, callback) {
    connection.query(`DELETE FROM topics WHERE id = ${idTopic}`, callback);
}

module.exports.editTopic = function(data, callback) {
    connection.query(`UPDATE topics SET name = '${data.name}', id_discipline = '${data.id_discipline}'
                      WHERE id = ${data.id}`, callback);
}

module.exports.findByTopic = function(name, callback) {
    connection.query(`SELECT * FROM topics WHERE name = '${name}'`, callback);
}

module.exports.deleteQuestion = function(idQuestion, callback) {
    connection.query(`DELETE FROM questions WHERE id = ${idQuestion}`, callback);
}

module.exports.findByQuestion = function(question, callback) {
    connection.query(`SELECT * FROM questions WHERE question = '${question}'`, callback);
}

module.exports.addQuestion = function(data, callback) {
    connection.query("INSERT INTO questions SET ?", data, callback);
}

module.exports.addAnswers = function(data, callback) {
    connection.query("INSERT INTO answers (id_question, answer, isTrue) VALUES ?", [data], callback);
}

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}