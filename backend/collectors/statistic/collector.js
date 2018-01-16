const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'statistic';
let collector = {};

collector.getStatisctic = username => {
    const data = request.getData(queries.getStatisctic(username));
    return data;
}

collector.saveResult = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

module.exports = collector;