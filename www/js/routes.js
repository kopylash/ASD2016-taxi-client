angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('orderARide', {
    url: '/page1',
    templateUrl: 'templates/orderARide.html',
    controller: 'orderARideCtrl'
  })

  .state('rideInfo', {
    url: '/page2',
    templateUrl: 'templates/rideInfo.html',
    controller: 'rideInfoCtrl'
  })

  .state('newOrder', {
    url: '/page3',
    templateUrl: 'templates/newOrder.html',
    controller: 'newOrderCtrl'
  })

  .state('currentOrder', {
    url: '/page4',
    templateUrl: 'templates/currentOrder.html',
    controller: 'currentOrderCtrl'
  })

  .state('orderHistory', {
    url: '/page5',
    templateUrl: 'templates/orderHistory.html',
    controller: 'orderHistoryCtrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});