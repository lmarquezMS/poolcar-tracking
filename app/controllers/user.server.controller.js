var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport');

exports.list = function(req, res, next){

  User.find({}, function(err, users){
    if(err){
      return next(err);
    } else {
      console.log(users);
      res.json(users);
    }
  })
};

exports.create = function(req, res, next){
  var user = new User(req.body);

  user.save(function(err){
    if(err){
        console.log('#######################');
        console.log(err);
        console.log('#######################');
      return next(err);
    } else {
      res.json(user);
    }
  });
};

exports.read = function(req, res){
  res.json(req.user);
};

exports.userByID = function(req, res, next, id){
  User.findOne({_id: id}, function(err, user){
    if(err){
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

exports.renderSignin = function(req, res, next){
  if(!req.user) {
    res.render('signin', {
      title: 'Sign-In Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};
