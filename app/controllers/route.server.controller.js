var mongoose = require('mongoose'),
  Route = mongoose.model('Route'),
  User = mongoose.model('User');

exports.create = function(req, res){
  console.log(req.body);
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

exports.read  = function(req, res, next){
  Route.findOne({
    _id: req.nRoute._id
  }, function(err, route){
    if (err){
      return next(err);
    } else {
      res.json(route);
    }
  });
};

exports.list = function(req, res, next){
  Route.find({}, function(err, routes){
    if(err){
      next(err);
    }
 }).populate('driver', "username _id address").exec(function(err, routes){
   console.log(routes[0].driver);
   res.json(routes);
 });
};

exports.update = function(req, res, next){
  Route.findByIdAndUpdate(req.nRoute._id, req.body, function(err, route){
    if(err){
      next(err);
    } else {
      res.json(route);
    }
  });
};

exports.delete = function(req, res, next){
  req.nRoute.remove(function(err){
    if(err){
      next(err);
    } else {
      res.json(req.route);
    }
  });
};

exports.getById = function(req, res, next, id){
  Route.findOne({_id: id}, function(err, route){
    if(err){
      next(err);
    } else {
      req.nRoute = route;
      next();
    }
  });
}
