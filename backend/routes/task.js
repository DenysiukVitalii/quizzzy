let app = require('express')();
let collector = require('../collectors/task');

app.get('/get_tasks', async(req, res) => {
    let tasks = await collector.getTasks();
    tasks = tasks.map(el => JSON.parse(el.tasks));
    console.log(tasks);
    tasks = tasks.map(el => {
        let answers = el.answers;
        answers = answers[0];
        answers = answers.slice(1,-1);
        answers = answers.split('`,`');
        answers = '{"answers":['.concat(answers, "]}");
        el.answers = JSON.parse(answers).answers;
        return el;
    });
    console.log(tasks);
    res.json(tasks);
});

app.post('/create_question', (req, res) => {
    let data = req.body;
    console.log(data); // {id_discipline, id_topic, date_creation, creator, question, answers}
    let question = {}, id_question, answers;
    question.id_topic = data.id_topic;
    question.question = data.question;
    question.creator = data.creator;
    question.date = data.date; // {id_topic, question}
    answers = data.answers;
    collector.findByQuestion(question.question, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addQuestion(question, function(err, info) {
                if (err) throw err;
                console.log(info);
                id_question = info.insertId;
                let insert_answers = [];
                answers.forEach(el => el.id_question = id_question);
                answers.forEach(i => insert_answers.push([i.id_question, i.answer, i.isTrue]))
                console.log(insert_answers);
                collector.addAnswers(insert_answers, function(err, info) {
                    if (err) throw err;
                    console.log(info);
                });
                res.json({ id: info.insertId, success: true });
            });
        };
    });
});

app.delete('/delete_question', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteAnswers(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        collector.deleteQuestion(data.id, function(err, info) {
            if (err) {
                next(err);
                return res.json({ success: false });
            }
            console.log(info);
        });
        res.json({ success: true });
    });
    
});

module.exports = app;