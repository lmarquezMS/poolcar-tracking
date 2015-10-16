angular.module('route').config(['$stateProvider', function($stateProvider){
  $stateProvider
    .state('routecreate', {
      url: "/routes/create",
      templateUrl: 'route/views/create-route.client.views.html',
      controller: 'RouteController'
    })
    .state('routelist', {
      url: '/routes/list',
      templateUrl: '/route/views/list-route.client.views.html',
      controller: 'RouteController'
    })
    // .state('useredit', {
    //   url: "/users/edit/:userId",
    //   templateUrl: '/user/views/edit-user.client.views.html',
    //   controller: 'UserController'
    // })
    .state('routeremove', {
      url: '/routes/remove/:routeId',
      templateUrl: '/route/views/remove-user.client.views.html',
      controller: 'RouteController'
    })
    .state('routeview',{
      url: "/routes/:routeId",
      templateUrl: '/route/views/view-route.client.views.html',
      controller: 'RouteController'
    });
}]);
