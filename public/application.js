
var mainApplicationModuleName = 'carpooling';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngMaterial', 'user','route','mapServices','indexModule']);
mainApplicationModule.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('blue');
});
