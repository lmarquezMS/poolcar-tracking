var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User');

module.exports = function(){
  passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({
      username: username
    },function(err, user){

        if(err){
          return done(err);
        }
        if (!user){
          console.log("no existe user");
          return done(null, false, {message: "Unknow User"});
        }

        if (!user.authenticate(password)){
          console.log("no authentica");
          return done(null, false, {message: 'Invalid Password'});
        }
        console.log("no hubo problema");
        return done(null, user);
    });
  })
)}
