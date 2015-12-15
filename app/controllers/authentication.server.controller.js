var mongoose = require('mongoose'),
User = mongoose.model('User');


exports.requiresLogin = function(req, res, next ){
  if(!req.isAuthenticated()){
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  next();
}

exports.renderSignin = function(req, res, next){
  if(!req.user) {
    res.render('signin',{
      title: "Signin"
    });
  } else {
    res.render('index',{
      title: "index"
    });
  }
};

exports.signup = function(req, res, next){
  console.log("entro a signup");

  if(!req.user){
    var user = new User(req.body);
    user.provider = 'local';

    user.save(function(err){
      if (err){
        return res.redirect('signup');
      }

      req.login(user, function(err){
        if(err) return next(err);
        console.log("no hay error");
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};
exports.renderSignup = function(req, res, next){

  if(!req.user) {
    res.render('signup', {
      title: 'Sign-Up Form'
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/signin');
};
