angular.module('user').controller('UserController', ['$scope', '$stateParams', 'Users', '$location', function($scope, $stateParams, Users, $location){

  $scope.find = function(){
    $scope.users = Users.query();
  }

  $scope.findOne = function(){
    var userId = $stateParams.userId;
    $scope.user = Users.get({userId: userId});
  }

  $scope.create = function(){

    var response = Users.save({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password,
      provider: "local"
    },function(response){
      $location.path('users/'+response._id);
    }, function(error){
        $scope.error  =error.data.message;
    });
  }

  $scope.update = function(){
    Users.update($scope.user,
    function(response){
      $location.path('users/'+$scope.user._id);
    }, function(err){
      $scope.error(err.data.message);
    });
  }

  $scope.remove = function(user) {
    if(user){
      user.$remove(function(){
        for(var u in $scope.users){
          if($scope.users[u] === user){
            $scope.users.splice(u, 1);
          }
        }
      });
    } else {
      $location.path('/users');
    }
  }


}]);
