
angular.module('route').controller('routeController', ['$scope', 'Maps',  'Routes','$mdSidenav', function($scope, Maps, Routes, $mdSidenav){

  $scope.routes = Routes.query();

  $scope.fabTrigged = {
    toogle: function(){
      this.isOpen = !this.isOpen;
    },
    isOpen: false

  }

  $scope.prueba = function(routeType){

    switch(routeType){
      case 'car':
        return typeOfRoutesConfig.car.stroke;
        break;
      case 'bike':
        return typeOfRoutesConfig.bike.stroke;
        break;
      case 'walk':
        return typeOfRoutesConfig.walk.stroke;
        break;
    }

  }

  var typeOfRoutesConfig = {
    car: {
      stroke: {
        color: '#FF0000',
        weight: 3,
        opacity: 0.7
      },
      name: 'car'
    },
    bike: {
      stroke: {
        color: '#006DD9',
        weight: 3,
        opacity: 0.7
      },
      name: 'bike'
    },
    walk: {
      stroke: {
        color: '#00B200',
        weight: 3,
        opacity: 0.7
      },
      name: 'walk'
    }
  };

  $scope.newRouteForm = function(typeConfig){
    $scope.newRoute = {
      name: "",
      origin: "",
      destination: "",
      dots: [],
      seats: 0,
      schedule: {      },
      routeType: typeConfig
    };
    $mdSidenav('right').toggle();
  }
    // Create a new route and save in app

    drawRouteCallback = function(response){
      if(response.routes.lenght != 0){
        var dots = [];
        var fRoute = response.routes[0];
        var legs = fRoute.legs;
        for(var i = 0; i<legs.length; i++){
          var leg = legs[i];
          for (var j = 0; j < leg.steps.length; j++) {
            var nextSegment = leg.steps[j].path;
            for (k=0;k<nextSegment.length;k++) {
              var nStep = nextSegment[k];
              dots.push({latitude: nStep.lat(), longitude: nStep.lng() });
            }
          }


        }
        $scope.newRoute.dots = dots;
        var response = Routes.save({
          name: $scope.newRoute.name,
          seats : $scope.newRoute.seats,
          dots : $scope.newRoute.dots,
          routeType : $scope.newRoute.routeType,
          origin: $scope.newRoute.origin,
          destination: $scope.newRoute.destination,
          driver: window.user.id
        },function(response){
          $scope.routes = Routes.query();
            $mdSidenav('right').toggle();

        }, function(error){
          $scope.error  =error.data.message;
        });

      }
    }

    $scope.create = function(type){
      Maps.drawRoute($scope.newRoute.origin, $scope.newRoute.destination, drawRouteCallback);
    };



    $scope.remove = function(index, route) {
      if(route){
        route.$remove(function(){
          $scope.routes.splice(index, 1);
        });
      } else {
        $location.path('/routes');
      }
    };



}]);
