var indexController = angular.module('indexController', []);


indexController.controller('mapController', ['$scope','uiGmapGoogleMapApi',  function($scope, uiGmapGoogleMapApi){
  $scope.title="titulo";
  $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 15, control: {} };

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

  })

}]);

indexController.controller('indexGralCtrl', ['$scope', function($scope){
  $scope.action = function(){
    alert('hola manola');
  }
}]);

indexController.controller('index');
