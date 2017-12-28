const request = require('../requests');
const c_queries = require('../common_queries');
const queries = require('./queries');
const bcrypt = require('bcrypt');

const TABLE = 'users';
let collector = {};

collector.getUsers = () => {
    const data = request.getData(queries.getUsers);
    return data;
}

collector.encrypt = (data, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, callback);
    })
}

collector.compare = (hash, password) => {
    return (bcrypt.compareSync(password, hash)) ? true : false;
}

collector.addUser = (data, callback) => {
    const query = c_queries.insert(TABLE);
    const req = request.insertData(data, query, callback);
    return req;
}

collector.findByUsername = (name, callback) => {
    const query = queries.findByUsername(name);
    const req = request.find(query, callback);
    return req;
}

collector.deleteUser = (id, callback) => {
    const query = c_queries.delete(TABLE, id);
    const res = request.find(query, callback);
    return res;
}

module.exports = collector;