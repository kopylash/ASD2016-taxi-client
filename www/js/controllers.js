var app = angular.module('app.controllers', []);



app.controller('orderARideCtrl', function ($scope, $stateParams, $http, $) {
  $scope.pickup = 'Liivi 2, Tartu';
  $scope.destination = 'Raatuse 22, Tartu';
  $scope.submit = function() {

    var googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyCV5Dzh05AxFuGv9ado0G8mRofL-8pOfL4'
    });

    googleMapsClient.distanceMatrix({
      origins: [
        $scope.pickup
      ],
      destinations: [
        $scope.destination
      ]
    })
      .asPromise()
      .then(expectOK)
      .then(function(response) {
          alert(response);
      });
    // $http.get('http://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + $scope.pickup + '&destinations=' + $scope.destination + '&key=AIzaSyCV5Dzh05AxFuGv9ado0G8mRofL-8pOfL4')
    //             .then(function (response) {
    //               var realDistance = response.rows[0].elements[0].distance.value;
    //               alert(response.rows[0].elements[0].distance.text);
    //             });

    // $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.pickup +'&sensor=false')
    //     .then(function (response) {
    //       var geometry = response.data.results[0].geometry.location;
    //       $scope.pickup_lat = geometry.lat;
    //       $scope.pickup_lon = geometry.lng;
    //       alert($scope.pickup_lat);
    //     });
  };
});

app.controller('rideInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

app.controller('newOrderCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('currentOrderCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('orderHistoryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
