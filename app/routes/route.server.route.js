module.exports = function(app){
  var routeController = require('../controllers/route.server.controller');

  app.route('/api/route')
    .post(routeController.create);

  app.route('/api/route/:routeId')
    .get(routeController.read);
}
