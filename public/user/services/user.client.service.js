var userServices = angular.module('userServices', ['ngResource']);

userServices.factory('Users', ['$resource', function($resource){
  return $resource('api/users/:userId', {
    userId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });

}]);
