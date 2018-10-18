const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    }
    //userId: { type: Schema.Types.ObjectId, ref: 'user' }
})

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


// Authentication - Login
UserSchema.statics.authenticate = function(username, password, callback) {
  User.findOne({ username: username })
    .exec(function(error, user) {
      if (error) {
        return  callback(error);
      } else if (!user) {
        var err = new Error('User not found!');
        err.status = 401;
        return callback(err);
      }

      // Compare using bcrypt
      bcrypt.compare(password, user.password, function(error, result){
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
};

const User = mongoose.model('User', UserSchema)
module.exports = User;
