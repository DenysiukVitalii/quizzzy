const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE = 'disciplines';
let collector = {};

collector.getDisciplines = () => {
    const data = request.getData(queries.getDisciplines);
    return data;
}

collector.addDiscipline = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.findByDiscipline = (name, callback) => {
    const query = queries.findByDiscipline(name);
    const req = request.find(query, callback);
    return req;
}

collector.deleteDiscipline = (id, callback) => {
    const query = c_queries.delete(TABLE, id);
    const res = request.find(query, callback);
    return res;
}

collector.editDiscipline = (data, callback) => {
    const query = queries.editDiscipline(data);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;