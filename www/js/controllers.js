let app = angular.module('app.controllers', ['geocodingService']);
const API_URL = "http://localhost:3000";
app.controller('orderARideCtrl', function ($scope, Geocoder, $http, $ionicLoading, $ionicPopup) {
  $scope.order = {};
  $scope.submit = function (order) {
    $scope.order = angular.copy(order);
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: 'Loading',
      }).then(function () {
        console.log("loading displayed");
      });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide().then(function () {
        console.log("loading hidden");
      });
    };

    $scope.showAlert = function (message) {
      let alertPopup = $ionicPopup.alert({
        title: "Woops something went wrong =(",
        template: message
      });

      alertPopup.then(function (res) {
        console.log("thanks")
      });
    };

    $scope.showLoading();

    $http.post([API_URL, "orders"].join("/"), {
      order: {
        pickup_address: $scope.order.pickup,
        dropoff_address: $scope.order.dropoff,
        client_name: $scope.order.name,
        phone: $scope.order.phoneNumber
      }
    }).then(res => {
      $scope.hideLoading();
      console.log("result: ", res);
    }, function (error) {
      console.log(error);
      $scope.hideLoading();
      $scope.showAlert(error.statusText === "" ? "Can't send request to server" : error.statusText);
    });
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
