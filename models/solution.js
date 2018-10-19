// problem.js Model
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/collabH', {useNewUrlParser: true});

const Solution = mongoose.model('Solution', {
  title: String,
  description: String,
  imagePath: String,
  problemId: { type: String, required: true },

});

module.exports = Solution
