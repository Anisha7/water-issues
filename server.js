// variables
const port = process.env.PORT || 5000;
// initializing handlebars
const exphbs = require('express-handlebars');

// mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/collabH', {useNewUrlParser: true});

// login
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = mongoose.connection;

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

// starting express server
const express = require('express')
const methodOverride = require('method-override')
const app = express()

// models
const Problem = require('./models/problem.js');
const Solution = require('./models/solution.js');
const Comment = require('./models/comment.js');
const User = require('./models/user.js');
// controllers
const login = require('./controllers/login.js')
const problems = require('./controllers/problems.js');

// app specifications
// set view engine to handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// serve all client-side assets in its public folder
app.use(express.static('public'));

// initialized
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Make user ID available in handlebar templates
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  console.log(req.session);
  console.log(res.locals.currentUser);
  next();
});


app.use(methodOverride('_method'))

// request handling, server calls
login(app);
problems(app);


// host app
module.exports = app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
