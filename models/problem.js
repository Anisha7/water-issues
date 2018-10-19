// problem.js Model
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});
const Schema = mongoose.Schema

const Problem = mongoose.model('Problem', {
  title: String,
  description: String,
  imagePath: String,
  // problemId: { type: String, required: true },
  userId: Schema.Types.ObjectId // make sure this is the user ID
  //_someId: Schema.Types.ObjectId,
});

module.exports = Problem
