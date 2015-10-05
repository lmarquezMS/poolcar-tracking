var mongoose = require('mongoose'),
  Route = mongoose.model('Route');

exports.create = function(req, res){
  var route = new Route(req.body);
  route.save(function(err){
    if(err){
      return res.status(400).send({
        message: "error"
      });
    } else {
      res.json(route);
    }
  });
}

exports.read  = function(req, res, next, id){
  Route.findOne({
    _id: id
  }, function(err, route){
    if (err){
      return next(err);
    } else {
      res.json(route);
    }
  });
}
