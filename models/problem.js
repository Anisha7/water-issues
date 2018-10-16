// problem.js Model
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

const Problem = mongoose.model('Problem', {
  title: String,
  description: String,
  imagePath: String,
  problemId: { type: String, required: true }
  //_someId: Schema.Types.ObjectId,
});

module.exports = Problem
