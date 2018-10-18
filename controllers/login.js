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

    // rendering views
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

    // posting information
    app.post('/login', function (req, res, next) {
        // Email and Password are not empty
        console.log(req.body);
        console.log(req.body.username);
        console.log(req.body.password);
          if (req.body.username && req.body.password) {

            // Attempt Authentication
            User.authenticate(req.body.username, req.body.password, function(error, user){

              // Error or User not found in database (info did not match)
              if (error || !user) {
                var err = new Error("Incorrect User or Password!");
                err.status = 401;
                return next(err);
              } else {
                  loggedIn = true;
                  // User Authenticated - Session / Cookie
                  req.session.userId = user._id;
                  return res.redirect('/feed');
              }
            });
          } else {
            var err = new Error ('User and password are required.');
            err.status = 401;
            return next(err);
          }
    });
}
