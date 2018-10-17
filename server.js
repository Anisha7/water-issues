// variables
const port = process.env.PORT || 5000;
// initializing handlebars
var exphbs = require('express-handlebars');

// mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

// starting express server
const express = require('express')
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


// request handling, server calls
problems(app);
login(app);

// host app
module.exports = app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
