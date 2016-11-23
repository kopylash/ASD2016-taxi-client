var app = angular.module('app.controllers', ['geocodingService']);
const API_URL = "http://localhost:3000";
app.controller('orderARideCtrl', function ($scope, Geocoder, $http) {
  $scope.order = {};
  $scope.submit = function (order) {
    $scope.order = angular.copy(order);
    $http.post([API_URL, "orders"].join("/"), {
      order: {
        pickup_address: $scope.order.pickup,
        dropoff_address: $scope.order.dropoff,
        client_name: $scope.order.name,
        phone: $scope.order.phoneNumber
      }
    }).then(res => {
      console.log("result: ", res);
    })

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
