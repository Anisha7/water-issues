var loggedIn = false;

function addNewUser(req, res, next) {
    var userData = {
      //email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      //passwordConf: req.body.passwordConf,
   }
   //use schema.create to insert data into the db
   User.create(userData, function (err, user) {
     if (err) {
       return next(err)
     } else {
         console.log("added to session");
         req.session.userId = user._id;
         return res.redirect('/');
     }
   });
}

module.exports = function (app) {

    app.get('/', (req, res) => {
        if (!loggedIn) {
            //res.render('login');
            res.redirect('/login')
        }

        else {
            res.redirect('/feed');
        }

    });

    app.get('/signup', (req, res) => {
        if (!loggedIn) {
            res.render('signup');
        }

    });

    app.get('/login', (req, res) => {
        if (!loggedIn) {
            res.render('login');
        }

    });
}
