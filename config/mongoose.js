var config = require('./config'),
  mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect(config.db);

  require('../app/models/route.server.model');
  require('../app/models/user.server.models');

  return db;
}
