exports.render = function(req, res){

  res.render('index', {
    title: 'Test Tracker',
    user: req.user ? req.user : null
  });
}
