var app = angular.module('app.controllers', ['geocodingService']);

app.controller('orderARideCtrl', function($scope, Geocoder) {
  $scope.pickup = 'Liivi 2, Tartu';
  $scope.destination = 'Raatuse 22, Tartu';
  $scope.submit = function() {
    //todo send request to server here
  };

  //usage example
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
