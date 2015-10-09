var mongoose  = require('mongoose'),
  Schema      = mongoose.Schema;

var routeSchema = new Schema({
    dots: [{lat: String, long:String}],
    name: String,
    schedule: [{
      weekDays: [String],
      hour: Date
    }],
    passangers: [{
      type: Schema.ObjectId,
      ref: 'User'}],
    driver: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    seats: Number
});

mongoose.model('Route', routeSchema);
