var mapsService = angular.module('mapServices', []);

userServices.factory('Maps', ['$q', 'uiGmapGoogleMapApi','uiGmapIsReady', function($q, uiGmapGoogleMapApi, uiGmapIsReady){

  var service = {
    drawRoute: drawRoute
  };

  var mapApi = {};
  uiGmapGoogleMapApi.then(function(maps){
    mapApi =  maps;
  })

  var mapInstance = {};
  uiGmapIsReady.promise(1).then(function(instance){
    mapInstance =  instance;
  })

  return service;

  // Por ahora no dibuja. Solo retorna los puntos
  function drawRoute(origin, destination, callback){



    var directionsDisplay = new mapApi.DirectionsRenderer();
    var directionsService = new mapApi.DirectionsService();

    var request = {
      origin: origin,
      destination: destination,
      travelMode: mapApi.DirectionsTravelMode['WALKING'],
      unitSystem: mapApi.DirectionsUnitSystem['METRIC'],
      provideRouteAlternatives: false,

    };

    directionsService.route(request, function(response, status){
      if (status == mapApi.DirectionsStatus.OK) {
        // directionsDisplay.setMap(mapInstance[0].map);
        // directionsDisplay.setOptions({draggable: true});
        // directionsDisplay.setDirections(response);
        callback(response);

      } else {
        alert("No existen rutas entre ambos puntos");
      }
    });

  }



}]);
