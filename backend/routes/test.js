let app = require('express')();
let collector = require('../collectors/test');

app.get('/get_tests', async(req, res) => {
    let tests = await collector.getTests();
    console.log(tests);
    res.json(tests);
});

app.post('/add_test', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByTestname(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addTest(data, async function(err, info) {
                if (err) throw err;
                console.log(info);
                console.log(data);
                let tasks = await collector.getRandTasks(data.id_topic, data.amount_tasks);
                console.log(tasks);
                fillTest(info.insertId, tasks, res);
                res.json({ success: true });
            });
        };
    });
});

function fillTest(id_test, tasks) {
    let data = [];
    tasks = tasks.map(task => {
        task.id_test = id_test;
        task.id_question = task.id;
        delete task.id;
        return task;
    });

    tasks.forEach(task => data.push([task.id_test, task.id_question]));
    console.log(data);

    collector.addTestTasks(data, function(err, info) {
        if (err) throw err;
        console.log(info);
    });
}

app.delete('/delete_test', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteTest(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        res.json({ success: true });
    });
});

app.get('/tests/:_id', async(req, res) => {
    let test_tasks = await collector.getTasksByTestId(req.params._id);
    console.log(test_tasks);
    test_tasks = test_tasks.map(el => JSON.parse(el.task));
    console.log(test_tasks);
    test_tasks = test_tasks.map(el => {
        let answers = el.answers;
        answers = answers[0];
        answers = answers.slice(1,-1);
        answers = answers.split('`,`');
        answers = '{"answers":['.concat(answers, "]}");
        el.answers = JSON.parse(answers).answers;
        return el;
    });
    console.log(test_tasks);
    res.json(test_tasks);
});



module.exports = app;