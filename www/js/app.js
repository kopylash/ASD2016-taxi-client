var app = angular.module('starter', ['ionic', 'starter.controllers']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('bookings', {
      url: '/bookings',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'BookingsCtrl'
    })
    .state('bookings.new', {
      url: '/new',
      views: {
        'menuContent': {
          templateUrl: 'templates/bookings/new.html'
        }
      }
    });
  $urlRouterProvider.otherwise('/bookings/new');
});
