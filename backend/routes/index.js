var app = require('express')();

app.use(require('./discipline'));
app.use(require('./topic'));
app.use(require('./task'));
app.use(require('./user'));

module.exports = app;