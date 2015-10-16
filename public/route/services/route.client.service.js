angular.module('route').factory('Routes', ['$resource', function($resource){
  return $resource('api/routes/:routeId', {
    routeId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });

}]);
