let app = require('express')();
let collector = require('../collectors/topic');

app.get('/get_topics', async(req, res) => {
    let topics = await collector.getTopics();
    console.log(topics);
    res.json(topics);
});

app.post('/topics_by_disc', async(req, res) => {
    let data = req.body;
    console.log(data);
    let tasks = await collector.getTopics(data.id_discipline);
    console.log(tasks);
    res.json(tasks);
})

app.post('/create_topic', (req, res) => {
    let data = req.body;
    console.log(data);
    collector.findByTopic(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addTopic(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

app.delete('/delete_topic', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteTopic(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        res.json({ success: true });
    });
});

app.put('/edit_topic', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByTopic(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.editTopic(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

module.exports = app;