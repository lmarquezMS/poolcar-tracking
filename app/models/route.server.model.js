var mongoose  = require('mongoose'),
  Schema      = mongoose.Schema;

var routeSchema = new Schema({
    origin: String,
    destination: String,
    dots: [{lat: String, lng:String}],
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
