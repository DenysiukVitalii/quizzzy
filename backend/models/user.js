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
    addTopic: (data, callback) => 
              request.insertData(data, queries.insert(table.topisc), callback),
    deleteTopic: (idTopic, callback) => 
                 request.find(queries.delete(table.topics, idTopic), callback),
    editTopic: (data, callback) => 
                request.find(queries.editTopic(data), callback),
    findByTopic: (topicname, callback) => 
                request.find(queries.findByTopic(topicname), callback),
    addQuestion: (data, callback) => 
                request.insertData(data, queries.insert(table.questions), callback),
    findByQuestion: (question, callback) => 
                request.find(queries.findByQuestion(question), callback),
    deleteQuestion: (idQuestion, callback) => 
                    request.find(queries.delete(table.questions, idQuestion), callback),
    addAnswers: (data, callback) => 
                request.insertDataArray(data, queries.insertAnswers, callback),
    getTopics: (idDisc = '') => {
                    let query = (idDisc) ?  queries.getTopicsByDisc : queries.getTopics;
                    return request.getData(query);
               },
    sendResponse: (success, res) => (success) ? res.json({ success: true }) : res.json({ success: false })
}
