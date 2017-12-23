const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'topics';
let collector = {};

collector.getTopics = (idDisc = '') => {
    let query = (idDisc) ? queries.getTopicsByDisc(idDisc) : queries.getTopics;
    const data = request.getData(query); 
    return data;
}

collector.addTopic = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.findByTopic = (name, callback) => {
    const query = queries.findByTopic(name);
    const req = request.find(query, callback);
    return req;
}

collector.deleteTopic = (id, callback) => {
    const query = c_queries.delete(TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.editTopic = (data, callback) => {
    const query = queries.editTopic(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;