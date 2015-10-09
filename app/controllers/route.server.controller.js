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

exports.read  = function(req, res, next){
console.log(req.nRoute);
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
    } else {
      res.json(routes);
    }
  });
};

exports.update = function(req, res, next){
  // var passangers = null;
  //  User.find({})
  //   .all(req.route.passangers, function(err, passangersList){
  //     if(err)
  //       next(err);
  //     else passangers = passangersList;
  //   });

    // req.route._id
 console.log(req.nRoute);
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
