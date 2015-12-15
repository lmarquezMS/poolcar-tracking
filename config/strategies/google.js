var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  User = require('mongoose').model('User');


module.exports = function(){
    passport.use(new GoogleStrategy({
      callbackURL: 'http://localhost:3000/auth/google/return',
      clientID: '35240953453-giu55l3vuh5j90cbjdg9nr5v5mslumfp.apps.googleusercontent.com',
      clientSecret: 'AyOlpHSCl1D4ldFU1TOqLtL1'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      process.nextTick(function(){
        User.findOne({provider: 'google', 'providerData.accessToken': accessToken }, function(err, user) {
          if(err){
            return done(err)
          }
          if(user){
            return done(null, user);
          } else {
            var newUser = new User();

            newUser.firstName                         = profile.name.givenName;
            newUser.lastName                          = profile.name.familyName;
            newUser.email                             = profile.emails != undefined ? profile.emails[0].value : "";
            newUser.photo                             = profile.photos[0].value;
            newUser.provider                          = 'google';
            newUser.providerData = newUser.providerData === undefined ? {} : newUser.providerData ;
            newUser.providerData.google = {
              id: profile.id,
              accessToken: accessToken
            };
            newUser.save(function(err, savedUser){
              if(err)
                return done(err);
              return done(null, savedUser);
            });
          }
        });
      })

    }))
}
