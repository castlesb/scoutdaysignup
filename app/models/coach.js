
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
//var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var CoachSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  school: { type: String, default: '' }
});

/**
 * User plugin
 */

//CoachSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

CoachSchema.path('name').validate(function (name) {
  return name.length;
}, 'Name cannot be blank');

CoachSchema.path('email').validate(function (email) {
  return email.length;
}, 'Email cannot be blank');

CoachSchema.path('email').validate(function (email, fn) {
  const User = mongoose.model('User');

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Email already exists');

/**
 * Methods
 */

CoachSchema.method({

});

/**
 * Statics
 */

CoachSchema.static({

});

/**
 * Register
 */

mongoose.model('Coach', CoachSchema);
