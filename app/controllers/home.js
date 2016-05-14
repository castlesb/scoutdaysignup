
/*!
 * Module dependencies.
 */
const mongoose = require('mongoose');
const assign = require('object-assign');
const wrap = require('co-express');
const User = mongoose.model('User');
const Coach = mongoose.model('Coach');
const only = require('only');

exports.index = function (req, res) {
  res.render('home/index', {
    title: 'ScoutDay'
  });
};

exports.createAthlete = wrap(function* (req, res) {
  var name = req.body.name;
	var email = req.body.email;
	var year = req.body.year;

	const newUser = new User({
		name: name,
		email:email,
		year: year
	});
  yield newUser.save();
  req.flash('success', 'You successfully resgistered to ScoutDay!');
  return res.redirect('/');
});

exports.createCoach = wrap(function* (req, res) {
  var name = req.body.name;
	var email = req.body.email;
	var school = req.body.school;

	const newUser = new Coach({
		name: name,
		email:email,
		school: school
	});
  yield newUser.save();
  req.flash('success', 'You successfully resgistered to ScoutDay!');
  return res.redirect('/');
});