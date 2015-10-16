angular.module('route').controller(
  'RouteController',
  ['$scope', '$stateParams', 'Routes', '$location','uiGmapGoogleMapApi', function($scope, $stateParams, Routes, $location,uiGmapGoogleMapApi){


        $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14, control: {} };
    // find all routes
    $scope.find = function(){

      $scope.routes = Routes.query();
    }
    // Find the route with id equal to the param passed from url
    $scope.findOne = function(){

      var routeId = $stateParams.routeId;
      $scope.route = Routes.get({routeId: routeId});
    }

    // Create a new route and save in app
    $scope.create = function(){
      var response = Routes.save({
        name: $scope.nRoute.name,
        seats : $scope.nRoute.seats,
        dots : $scope.nRoute.dots,
        type : $scope.nRoute.type,
      },function(response){
        $location.path('routes/list');
      }, function(error){
          $scope.error  =error.data.message;
      });
    }

    $scope.remove = function(index, route) {

      if(route){
        route.$remove(function(){
          $scope.routes.splice(index, 1);
          // for(var r in $scope.route){
          //   if($scope.route[r] === route){
          //     $scope.routes.splice(r, 1);
          //   }
          // }
        });
      } else {
        $location.path('/routes');
      }
    }

    $scope.changeLocation = function(position){
      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.map.control.refresh($scope.map.center);
    };

    $scope.autoLocate = function(){
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition($scope.changeLocation);
      }
    };



    $scope.prepateToCreate = function(){
      $scope.nRoute = {
        name: "",
        dots: [],
        seats: 0,
        type: "car"
      };
    }


      uiGmapGoogleMapApi.then(function(maps){

        $scope.drawRoute = function(originAddress,destinationAddress){

          var directionsDisplay = new maps.DirectionsRenderer();
          var directionsService = new maps.DirectionsService();

          var request = {
            origin: originAddress,
            destination: destinationAddress,
            travelMode: maps.DirectionsTravelMode['WALKING'],
            unitSystem: maps.DirectionsUnitSystem['METRIC'],
            provideRouteAlternatives: true
          };

          directionsService.route(request, function(response, status) {
            console.log(response);

            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setMap($scope.map.control.getGMap());
              directionsDisplay.setOptions({draggable: true});
              // directionsDisplay.setPanel($("#route_panel")[0])
              directionsDisplay.setDirections(response);

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




            } else {
              alert("No existen rutas entre ambos puntos");
            }
          });

        }



      });

    // uiGmapGoogleMapApi.then(function(maps) {
    //   var directionsRenderer = new maps.DirectionsRenderer();
    //   console.log(directionsRenderer);
    //   });

  }]);
