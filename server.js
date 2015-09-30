
process.env.NODE_ENV  = process.env.NODE_ENV || 'development';
process.env.PORT      = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);
 var mongoose  = require('./config/mongoose'),
  express     = require('./config/express');
var db  = mongoose();
var app = express();


app.listen(process.env.PORT);

console.log("Corriendo el servidor en http://localhost:3000/");

module.exports  = app;
