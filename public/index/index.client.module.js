var  indexModule = angular.module('indexModule', ['indexController','uiGmapgoogle-maps']);

indexModule.config(function(uiGmapGoogleMapApiProvider){
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBDAswZ7ptOSx7jH2ur0V0CbqjdWrlxBdU',
    libraries: 'geometry,visualization, geocoding'
  });
});
