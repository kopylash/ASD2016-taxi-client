angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('orderARide', {
    url: '/new',
    templateUrl: 'templates/orderARide.html',
    controller: 'orderARideCtrl'
  })

  .state('rideInfo', {
    url: '/info',
    templateUrl: 'templates/rideInfo.html',
    controller: 'rideInfoCtrl'
  });

$urlRouterProvider.otherwise('/new')



});
