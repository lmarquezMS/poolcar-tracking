module.exports = function(app){
  var routeController = require('../controllers/route.server.controller');

  app.route('/api/routes')
    .post(routeController.create)
    .get(routeController.list);

  app.route('/api/routes/:routeId')
    .get(routeController.read)
    .put(routeController.update)
    .delete(routeController.delete);

  app.param('routeId', routeController.getById);
}
