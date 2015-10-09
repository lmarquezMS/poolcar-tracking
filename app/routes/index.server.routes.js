module.exports = function(app){
  var index = require('../controllers/index.server.controller'),
   passport = require('passport')
   users = require('../../app/controllers/user.server.controller');
  app.get('/', index.render);
}
