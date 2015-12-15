var indexController = angular.module('indexController', []);


indexController.controller('mapController', ['$scope','uiGmapGoogleMapApi','uiGmapIsReady', 'Users','Routes', function($scope, uiGmapGoogleMapApi,uiGmapIsReady, Users, Routes){
  $scope.title="titulo";
  $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 15, control: {} };
  $scope.usersMarks = [];


  //Cargo los markers (usuarios)
  Users.query().$promise.then(function (result){
    var markers = [];
    for(var i=0; i<result.length; i++){
      createMarker(result[i], function(marker){
        $scope.usersMarks.push(marker);
      });
    }
  });

  function createMarker(user, callback){
    uiGmapGoogleMapApi.then(function(maps){
      var geocoder = new maps.Geocoder();
      geocoder.geocode({'address': user.address.addressStr}, function(res, status){
        var marker = {
          id: user._id,
          coords: {
            latitude:res[0].geometry.location.G,
            longitude: res[0].geometry.location.K,
          },
          icon: {
            url: '//lh5.googleusercontent.com/-ju-u7uhJwsc/AAAAAAAAAAI/AAAAAAAAAAA/viIkUsrnq_8/s32-c-mo/photo.jpg'}
        };
        callback(marker);
      });
    });
  }

  //Cargo las rutas
  Routes.query().$promise.then(function (result){
    var routes = [];
    for(var i=0; i<result.length; i++){
      createMarker(result[i], function(marker){
        $scope.usersMarks.push(marker);
      });
    }
  });

  uiGmapGoogleMapApi.then(function(maps){

      $scope.changeLocation = function(position){
        $scope.map.center.latitude = position.coords.latitude;
        $scope.map.center.longitude = position.coords.longitude;
        $scope.map.control.refresh($scope.map.center);
      };

      // Set position on map using the current position

      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition($scope.changeLocation);
      }
      //load Users Markers
  })

}]);

indexController.controller('indexGralCtrl' , ['$scope',  function($scope){

  $scope.logout = function(){
    window.location = ('/signout');
  }


}]);

indexController.controller('indexSignInCtrl', ['$scope', 'Users', function($scope, Users){
  
}]);

indexController.controller('index');
