var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.render = function(req, res){
  var user = null;
  if(req.user){
    User.findOne(
      {
        _id: req.user
      },
       function(err, user){
        if(!err){
          var sessionUser = {
            photo: user.photo,
            id : user._id,
            fullName: user.firstName + ' ' + user.lastName
          };
          res.render('index', {
            title: 'Test Tracker',
            user: sessionUser
          });
        }
    });
  }else{
    res.render('signin',{
      title: "Signin"
    })
  }



}
