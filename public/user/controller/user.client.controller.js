angular.module('user').controller('UserController', ['$scope', '$stateParams', 'Users', function($scope, $stateParams, Users){
  // $scope.users = [
  //   {
  //     id: 1,
  //     userName: "User1"
  //   },
  //   {
  //     id: 2,
  //     userName: "User2"
  //   },
  //   {
  //     id: 3,
  //     userName: "User3"
  //   },
  //   {
  //     id: 4,
  //     userName: "User4"
  //   },
  // ]
  $scope.find = function(){
    console.log(Users.query());
    $scope.users = Users.query();
  }

  $scope.findOne = function(){
    var userId = $stateParams.userId;
    $scope.user = $scope.users[userId-1];
  }
}]);
