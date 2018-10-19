const Problem = require('../models/problem.js');

// functions
let requiresLogin = function(req, res, next) {
    console.log(req.session.userId)
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
    //return next();
  }
}

module.exports = function(app) {

    // SHOW
    app.get('/feed', (req, res) => {
        //res.render("Hello World")
        Problem.find().then(problem => {
            res.render('problems-index', {problem: problem})
        })
    });

    // NEW
    app.get('/feed/new', (req, res) => {
        res.render('problems-new', {userId: req.session.userId});
    })

    // problem page
    app.get('/feed/:problemId', requiresLogin, (req, res) => {
        res.send("it will show up here");
    })

    // CREATE A NEW PROBLEM
    app.post('/feed', requiresLogin, (req, res) => {
        console.log("here");
        Problem.create(req.body).then((problem) => {
            res.redirect(`/feed/${problem._id}`)
        }).catch(err => { console.log(err);})
    })



}
