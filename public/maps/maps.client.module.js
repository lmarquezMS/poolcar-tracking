var mapsModule = angular.module('maps', ['uiGmapgoogle-maps']);

mapsModule.config(function(uiGmapGoogleMapApiProvider){
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDbGFCm6CtBPgmlPu5IXpOYebqhCCNie8o',
    libraries: 'geometry,visualization, geocoding'
  });
});
