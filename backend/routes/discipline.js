let app = require('express')();
let collector = require('../collectors/discipline');

app.get('/get_disc', async(req, res) => {
    let discs = await collector.getDisciplines();
    console.log(discs);
    res.json(discs);
});

app.post('/create_disc', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByDiscipline(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.addDiscipline(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

app.delete('/delete_disc', (req, res, next) => {
    var data = req.body;
    console.log(data.id);
    collector.deleteDiscipline(data.id, function(err, info) {
        if (err) {
            next(err);
            return res.json({ success: false });
        }
        console.log(info);
        res.json({ success: true });
    });
});

app.put('/edit_disc', (req, res) => {
    var data = req.body;
    console.log(data);
    collector.findByDiscipline(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            res.json({ success: false });
        } else {
            collector.editDiscipline(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({ success: true });
            });
        };
    });
});

module.exports = app;