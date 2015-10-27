var  indexModule = angular.module('indexModule', ['indexController','uiGmapgoogle-maps']);

indexModule.config(function(uiGmapGoogleMapApiProvider){
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDbGFCm6CtBPgmlPu5IXpOYebqhCCNie8o',
    libraries: 'geometry,visualization, geocoding'
  });
});
