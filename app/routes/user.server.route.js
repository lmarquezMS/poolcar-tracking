module.exports = function(app){

  var usersController = require('../controllers/user.server.controller'),
    passport = require('passport');

  app.route('/api/users')
    .get(usersController.list)
    .post(usersController.create);

  app.route('/api/users/:userId')
    .get(usersController.read)
    .put(usersController.update)
    .delete(usersController.delete);

  app.route('/signin')
    .get(usersController.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin'
    }));

  app.param('userId', usersController.userByID);
};
