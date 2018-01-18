let app = require('express')();
let collector = require('../collectors/statistic');

app.post('/get_statistic', async(req, res) => {
    let data = req.body;
    let statistic = await collector.getStatisctic(data.username);
    statistic = statistic.map(i => {
        i.date = i.date.toISOString().split('T')[0];
        return i;
    });
    console.log(statistic);
    res.json(statistic);
});

app.post('/save_result', (req, res) => {
    let data = req.body;
    console.log(data);
    collector.saveResult(data, function(err, info) {
        if (err) throw err;
        console.log(info);
        res.json({ success: true });
    });
}); 

module.exports = app;