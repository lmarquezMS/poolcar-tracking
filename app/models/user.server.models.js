var mongoose = require('mongoose'),
  crypto = require('crypto'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String
  },
  photo: String,
  password: {
    type: String,
    validate: [
      function(password){
        console.log("quiere verificar pass");
        return password && password.length > 6
      }, 'Password should be longer'
    ],
  },
  salt:{
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {
    type: Object
  },
  address: {
    addressStr: {
      type: String
    },
    hidden: {
      type: Boolean,
      default: true
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Antes de guardar el usuario hasheo el pass en salt
UserSchema.pre('save', function(next){
  if(this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    console.log("este es el salt: " + this.salt);
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
}

UserSchema.methods.authenticate = function(password){
  return this.password === this.hashPassword(password);
}

mongoose.model('User', UserSchema);
