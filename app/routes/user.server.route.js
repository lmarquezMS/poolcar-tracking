module.exports = function(app){

  var usersController = require('../controllers/user.server.controller');

  app.route('/api/users')
    .get(usersController.list)
    .post(usersController.create);

  app.route('/api/users/:userId')
    .get(usersController.read);

  app.param('userId', usersController.userByID);
};
