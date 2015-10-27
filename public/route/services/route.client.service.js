angular.module('route').factory('Routes', ['$resource', function($resource){
    return $resource('api/routes/:routeId', {
      routeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

  // var mapOptionsList;
  //
  // var service = {
  //   mapOptionsList: mapOptionsList,
  //   loadRoutes: loadRoutes
  // }
  //
  // return service;
  //
  // function loadRoutes() {
  //   return $resource('api/routes/:routeId', {
  //     routeId: '@_id'
  //   }, {
  //     update: {
  //       method: 'PUT'
  //     }
  //   }).then(function() {
  //     // haces cosas
  //     mapOptionsList = //valor;
  //   });
  // }

}]);
