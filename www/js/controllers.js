var app = angular.module('starter.controllers', []);

app.controller('BookingsCtrl', function($scope, $ionicModal, $http) {
  $scope.longitude = 0;
  $scope.latitude = 0;
  $scope.sync_notification = '';

  $scope.submit = function() {
    $http.post('http://localhost:3000/bookings', {longitude: $scope.longitude, latitude: $scope.latitude})
      .then(function (response) {
        $scope.sync_notification = response.data.message;
        $scope.modal.show();
      });
  };

  $ionicModal.fromTemplateUrl('templates/bookings/sync-notification.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function() {
    $scope.sync_notification = '';
    $scope.modal.hide();
  };
});
