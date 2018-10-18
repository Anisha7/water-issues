const Problem = require('../models/problem.js');

module.exports = function(app) {

    // SHOW
    app.get('/feed', (req, res) => {
        //res.render("Hello World")
        Problem.find().then(problem => {
            res.render('problems-show', {problem: problem})
        })
        console.log("I tried but there's no data!")

    });

    // NEW
    app.get('/feed/new', (req, res) => {
        res.render('problems-new');
    })
}
