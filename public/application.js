
var mainApplicationModuleName = 'carpooling';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ui.router', 'user']);



angular.element(document).ready(function(){
  angular.bootstrap(document, [mainApplicationModuleName]);
});
