angular.module('wrg', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    console.log("Hello from Angular")

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
      templateUrl: 'templates/home.html',
      controller: 'ServerController',
      url: '/home'
    }).state('detail', {
      templateUrl: 'templates/detail.html',
      controller: 'ServerDetailController',
      url: '/home/:id'
    })
  });
