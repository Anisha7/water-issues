const Problem = require('../models/problem.js');

module.exports = function(app) {
    app.get('/feed', (req, res) => {
        //res.render("Hello World")
        Problem.find().then(problem => {
            res.render('problems-show', {problem: problem})
        })
        console.log("I tried but there's no data!")

    })
}
