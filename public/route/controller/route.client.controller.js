var routeControllers = angular.module('routeControllers', []);


routeControllers.controller('testCtrl', ['$scope', '$stateParams', 'Routes', 'uiGmapGoogleMapApi', '$location',function($scope, $stateParams, Routes, uiGmapGoogleMapApi, $locatio){
  $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
  $scope.msg = "hola manola";
  uiGmapGoogleMapApi.then(function(maps){
    console.log(maps);
    $scope.map.control.refresh({latitude: 32.779680, longitude: -79.935493});

  });
}]);
routeControllers.controller('routeListCtrl', ['$scope', '$stateParams', 'Routes', 'uiGmapGoogleMapApi', '$location', function($scope, $stateParams, Routes, uiGmapGoogleMapApi, $location){

  $scope.routes = Routes.query();
  $scope.mapOptionsList = [];

  $scope.loadMapOptions  = function(callback){
    $scope.routes.$promise.then(function(result){
      if(result){
        for(var i=0; i<result.length; i++){
          var route = result[i];
          var opts = {
            origin: route.origin ? route.origin: "",
            destination: route.destination ? route.destination: "",
            waypoints: []
          };
          for(var j=0; j<route.dots.length; j++){
            var dot = route.dots[j];
            opts.waypoints.push({
              location: {
                lat: dot.lat,
                lng: dot.long
              },
              stopover: false
            });
          }
          $scope.mapOptionsList.push({
            options: opts,
            callback: null
          });
        }
      }
      callback($scope.mapOptionsList);
    });
  }

  $scope.remove = function(index, route) {
    if(route){
      route.$remove(function(){
        $scope.routes.splice(index, 1);
      });
    } else {
      $location.path('/routes');
    }
  };



}] );

routeControllers.controller('routeCreateController', ['$scope', '$stateParams', 'Routes', '$location','uiGmapGoogleMapApi', function($scope, $stateParams, Routes, $location,uiGmapGoogleMapApi){

  $scope.nRoute = {
    name: "",
    origin: "",
    destination: "",
    dots: [],
    seats: 0,
    type: "car"
  };

  $scope.mapOptions = {
    origin: "",
    destination: "",

  }

  // Create a new route and save in app
  $scope.create = function(){
    var response = Routes.save({
      name: $scope.nRoute.name,
      seats : $scope.nRoute.seats,
      dots : $scope.nRoute.dots,
      type : $scope.nRoute.type,
      origin: $scope.mapOptions.origin,
      destination: $scope.mapOptions.destination
    },function(response){
      $location.path('routes/list');
    }, function(error){
      $scope.error  =error.data.message;
    });
  };

  $scope.drawRouteCallback = function(response){
    if(response.routes.lenght != 0){
      var dots = [];
      var fRoute = response.routes[0];
      var legs = fRoute.legs[0];
      dots[0] = {lat: legs.start_location.lat(), long: legs.start_location.lng()};
      for(var i = 0; i<legs.steps.length; i++){
        var nStep = legs.steps[i].end_location;
        dots[i+1] = {lat: nStep.lat(), long: nStep.lng() };
      }
      $scope.nRoute.dots = dots;
    }
  }
}]);

routeControllers.controller('routeMapController', ['$scope', '$stateParams', 'Routes', '$location','uiGmapGoogleMapApi', function($scope, $stateParams, Routes, $location,uiGmapGoogleMapApi){

  $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
  $scope.mapInstance = {},


  $scope.drawRoutes = function(routesOptions){
    if(routesOptions){
      for(var i=0; routesOptions.length; i++ ){
        var routeOption = routesOptions[i];
        $scope.drawRoute(routeOption.options, routeOption.callback);
      }
    }
  };



  /**
  * This function draws a route on the map canvas.
  * The route isn't drawed using polylines but direction services.
  * @param String originAddress
  * @param String destinationAddress
  * @param Array wayPoints
  * @param function callback
  */
  $scope.drawRoute = function(options, callback){
    uiGmapGoogleMapApi.then(function(maps){
      var directionsDisplay = new maps.DirectionsRenderer();
      var directionsService = new maps.DirectionsService();
      var request = {
        origin: options.origin,
        destination: options.destination,
        travelMode: options.travelMode === undefined ?$scope.mapInstance.DirectionsTravelMode['WALKING'] :  $scope.mapInstance.DirectionsTravelMode[options.travelMode],
        unitSystem: $scope.mapInstance.DirectionsUnitSystem['METRIC'],
        provideRouteAlternatives: false,

      };

      directionsService.route(request, function(response, status){
        if (status == $scope.mapInstance.DirectionsStatus.OK) {
          directionsDisplay.setMap($scope.map.control.getGMap());
          directionsDisplay.setOptions({draggable: true});
          directionsDisplay.setDirections(response);
          if(callback){
            callback(response);
          }
        } else {
          alert("No existen rutas entre ambos puntos");
        }
      });
    });
  };

  uiGmapGoogleMapApi.then(function(maps){
    $scope.mapInstance  =maps;
  });
}]);

// angular.module('route').controller(
//   'RouteController',
//   ['$scope', '$stateParams', 'Routes', '$location','uiGmapGoogleMapApi', function($scope, $stateParams, Routes, $location,uiGmapGoogleMapApi){
//
//
//     $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
//
//     // find all routes
//     $scope.find = function(){
//       return $scope.routes = Routes.query();
//     }
//
//     // Find the route with id equal to the param passed from url
//     $scope.findOne = function(){
//       var routeId = $stateParams.routeId;
//       $scope.route = Routes.get({routeId: routeId});
//     }
//
//
//
//     // Remove route
//
//
//     // On create view, initialize the element nRoute
//     $scope.initCreate =  function(){
//
//
//
//     };
//
//     // Change location on map
//     $scope.changeLocation = function(position){
//       $scope.map.center.latitude = position.coords.latitude;
//       $scope.map.center.longitude = position.coords.longitude;
//       $scope.map.control.refresh($scope.map.center);
//     };
//
//     // Set position on map using the current position
//     $scope.autoLocate = function(){
//       if (navigator.geolocation){
//         navigator.geolocation.getCurrentPosition($scope.changeLocation);
//       }
//     };
//
//
    // uiGmapGoogleMapApi.then(function(maps){
//       $scope.autoLocate();
//
//       var directionsDisplay = new maps.DirectionsRenderer();
//       var directionsService = new maps.DirectionsService();
//
//
//
//       $scope.drawListOfRoutes = function(){
//         $scope.find.promise.then(function(result){
//           $scope.GMapPaths = [];
//           for(var i=0; i<$scope.routes.length; i++){
//             var route = $scope.routes[i];
//             $scope.GMapPaths[i] ={
//               id: route._id,
//               path:[],
//               stroke: {
//                 color: '#6060FB',
//                 weight: 3
//               },
//               editable: true,
//               draggable: true,
//               geodesic: true,
//               visible: true
//             };
//             for(var j=0; j<route.dots.length; j++){
//               var dot = route.dots[j];
//               $scope.GMapPaths[i].path.push({latitude: dot.lat, longitude: dot.long});
//             }
//           }
//         });
//       };
//
//
//     };

//   });
// }]);
