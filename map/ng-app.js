angular.module('app', ['ngRoute','app.controller','app.service'])

.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'index.html',
    controller  : 'mapCtrl'
  })

  .otherwise({redirectTo: '/'});
})