const request = require('./requests');
const queries = require('./queries');
const table = require('./tables');

module.exports = {
    getUsers: () => request.getData(queries.getUsers),
    addUser: (data, callback) => 
             request.insertData(data, queries.insert(table.users), callback),
    deleteUser: (idUser, callback) => 
             request.find(queries.delete(table.users, idUser), callback),
    findBySpecname: (username, callback) => 
             request.find(queries.findByUsername(username), callback),
    encrypt: (data, callback) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(data.password, salt, callback);
        })
    },
    compare: (hash, password, callback) => (bcrypt.compareSync(password, hash)) ? true : false,
    getTasks: () => request.getData(queries.getTasks),
    getDisc: () => request.getData(queries.getDisc),
    addDiscipline: (data, callback) => 
                   request.insertData(data, queries.insert(table.disciplines), callback),
    deleteDiscipline: (idDisc, callback) => 
                      request.find(queries.delete(table.disciplines, idDisc), callback),
    editDiscipline: (data, callback) => 
                    request.find(queries.editDiscipline(data), callback),
    findByDiscipline: (discname, callback) => 
                      request.find(queries.findByDiscipline(discname), callback),
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