module.exports = function(app){
  var authController = require('../controllers/authentication.server.controller'),
   passport = require('passport');

   app.route('/signin')
   .get(authController.renderSignin)
   .post(passport.authenticate('local', {
     successRedirect: '/',
     failureRedirect: '/signin'
   }));

   app.route('/signup')
   .get(authController.renderSignup)
   .post(authController.signup);

   app.route('/signout')
    .get(authController.signout);

  app.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

  app.get('/auth/google/return', passport.authenticate('google',
    { successRedirect: '/',
      failureRedirect: '/login'}
    ));






}
