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
      return next(err);
    } else {
      res.json(user);
    }
  });
};

exports.read = function(req, res){
  res.json(req.user);
};

exports.update = function(req, res, next){
  User.findByIdAndUpdate(req.user._id, req.body, function(err, user){
    if(err){
      return next(err);
    } else {
      res.json(user);
    }

  });
}

exports.delete = function(req, res, next){
  req.user.remove(function(err){
    if(err){
      return next(err);
    }else{
      res.json(req.user);
    }
  });
}

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
    res.render('signin', {
      title: 'Sign-In Form'
    });
  } else {
    return res.redirect('/');
  }
};

exports.signup = function(req, res, next){

  if(!req.user){
    var user = new User(req.body);
    user.provider = 'local';

    user.save(function(err){
      if (err){
        return res.redirect('signup');
      }
      req.login(user, function(err){
        if(err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};
exports.renderSignup = function(req, res, next){
console.log(req.user);
  if(!req.user) {
    console.log("no-logueado");
    res.render('signup', {
      title: 'Sign-Up Form'
    });
  } else {
    return res.redirect('/');
  }
}
