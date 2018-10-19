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

    // SHOW all problems
    app.get('/feed', (req, res) => {
        //res.render("Hello World")
        Problem.find().then(problem => {
            res.render('problems-index', {problem: problem})
        })
    });

    // NEW form
    app.get('/feed/new', (req, res) => {
        res.render('problems-new', {userId: req.session.userId});
    })

    // Problem page
    app.get('/feed/:problemId', requiresLogin, (req, res) => {
        res.render('problems-show');
    })

    // Edit page
    app.get('/feed/:problemId/edit', requiresLogin, (req,res) => {
        Problem.findById(req.params.id, function(err, problem) {
            res.render('problems-edit');
        })
    })

    // CREATE A NEW PROBLEM
    app.post('/feed', requiresLogin, (req, res) => {
        console.log("here");
        Problem.create(req.body).then((problem) => {
            res.redirect(`/feed/${problem._id}`)
        }).catch(err => { console.log(err);})
    })

    // UPDATE
    // not working
    app.put('/feed/:problemId' , requiresLogin, (req, res) => {
        Problem.findByIdAndUpdate(req.params.id, req.body)
          .then(problem => {
            res.redirect(`/feed/${problem._id}`)
          })
          .catch(err => {
            console.log(err.message)
          })
     })

     // Delete
     app.delete('/feed/:problemId', requiresLogin, function (req, res) {
        console.log("DELETE problem")
        Problem.findByIdAndRemove(req.params.id).then((problem) => {
          res.redirect(`/feed`);
        }).catch((err) => {
          console.log(err.message);
        })
      })








}
