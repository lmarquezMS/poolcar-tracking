angular.module('user').config(['$stateProvider', function($stateProvider){
  $stateProvider
    .state('usercreate', {
      url: "/users/create",
      templateUrl: 'user/views/create-user.client.views.html',
      controller: 'UserController'
    })
    .state('userlist', {
      url: '/users/list',
      templateUrl: '/user/views/list-user.client.views.html',
      controller: 'UserController'
    })
    .state('useredit', {
      url: "/users/edit/:userId",
      templateUrl: '/user/views/edit-user.client.views.html',
      controller: 'UserController'
    })
    .state('userremove', {
      url: '/users/remove/:userId',
      templateUrl: '/user/views/edit-user.client.views.html',
      controller: 'UserController'
    })
    .state('userview',{
      url: "/users/:userId",
      templateUrl: '/user/views/view-user.client.views.html',
      controller: 'UserController'
    });
}]);
