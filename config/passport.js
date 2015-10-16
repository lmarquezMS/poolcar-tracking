var passport = require('passport'),
  mongoose = require('mongoose');

module.exports = function(){
  var User = mongoose.model('User');

//Defino una clave de busqueda en la session para cuando quiero recuperar el usuario.
  passport.serializeUser(function(user, done){
    console.log(user.id);
    done(null, user.id);
  });

// Defino de que forma obtengo el usuario dependiendo del valor que tengo en la session.
  passport.deserializeUser(function(id, done){
    User.findOne({
      _id: id
    }, '-password -salt', function(err, user){
      done(err, user);
    })
  });

  require('./strategies/local.js')();
}
