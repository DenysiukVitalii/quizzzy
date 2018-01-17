const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');

const TABLE_TESTS = 'tests';
const TABLE_TEST_TASKS = 'test_tasks';
let collector = {};

collector.getTests = () => {
    const data = request.getData(queries.getTests);
    return data;
}

collector.getRandTasks = (id_topic, amount_tasks) => {
    console.log(id_topic, amount_tasks);
    const data = request.getData(queries.getRandTasks(id_topic, amount_tasks));
    return data;
}

collector.addTest = (data, callback) => {
    const query = c_queries.insert(TABLE_TESTS);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.findByTestname = (name, callback) => {
    const query = queries.findByTestname(name);
    const req = request.find(query, callback);
    return req;
}

collector.addTestTasks = (data, callback) => {
    const query = queries.insertTestTasks;
    const req = request.insertDataArray(data, query, callback);
    return req;
}

collector.deleteTest = (id, callback) => {
    const query = c_queries.delete(TABLE_TESTS, id);
    const res = request.find(query, callback);
    return res;
}

collector.deleteTestTasks = (id, callback) => {
    const query = queries.deleteTestTasks(id);
    const res = request.find(query, callback);
    return res;
}

collector.getTasksByTestId = (id) => {
    const data = request.getData(queries.getTasksByTestId(id));
    return data;
}

module.exports = collector;