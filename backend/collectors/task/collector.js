const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE_QUESTIONS = 'questions';
let collector = {};

collector.getTasks = () => {
    const query = queries.getTasks;
    const data = request.getData(query); 
    return data;
}

collector.addQuestion = (data, callback) => {
    const query = c_queries.insert(TABLE_QUESTIONS);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.findByQuestion = (name, callback) => {
    const query = queries.findByQuestion(name);
    const req = request.find(query, callback);
    return req;
}

collector.addAnswers = (data, callback) => {
    const query = queries.insertAnswers;
    const req = request.insertDataArray(data, query, callback);
    return req;
}

collector.deleteQuestion = (id, callback) => {
    const query = c_queries.delete(TABLE_QUESTIONS, id);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;