var mongoose  = require('mongoose'),
  Schema      = mongoose.Schema;

var routeSchema = new Schema({
    dots: [{lat: String, long:String}],
});

mongoose.model('Route', routeSchema);
