var app = angular.module('app.controllers', ['geocodingService']);


app.controller('orderARideCtrl', function($scope, Geocoder) {
  $scope.pickup = 'Liivi 2, Tartu';
  $scope.destination = 'Raatuse 22, Tartu';
  $scope.submit = function() {

    // var googleMapsClient = require('@google/maps').createClient({
    //   key: 'AIzaSyCV5Dzh05AxFuGv9ado0G8mRofL-8pOfL4'
    // });

  };
  //
  // $scope.data = GoogleDistanceAPI.getDistanceMatrix({
  //   origins: [$scope.pickup],
  //   destinations: [$scope.destination]
  // }).then(distanceMatrix => {
  //   console.log(distanceMatrix);
  //   return distanceMatrix;
  // });

  Geocoder.code($scope.pickup).then(res => {
    $scope.data = res;
    console.log("dat", $scope.data);
  });

});

app.controller('rideInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {


  }])

app.controller('newOrderCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {


  }])

  .controller('currentOrderCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }])

  .controller('orderHistoryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }])
