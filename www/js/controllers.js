var app = angular.module('app.controllers', ['geocodingService']);

var API_URL = "http://localhost:3000";


app.controller('orderARideCtrl',
  function($scope, Geocoder, $http, $location, $ionicLoading, $ionicPopup, $rootScope, sharedOrderResponse, sharedCurrentLocation, sharedPickupDropoffLocation, PusherService, $ionicNavBarDelegate, $ionicPopup) {
    $scope.order = {};

    $scope.fetchLocation = function() {
      navigator.geolocation.getCurrentPosition(function(response) {
        var latitude = response.coords.latitude,
          longitude = response.coords.longitude;

        sharedCurrentLocation.setCurrentLocation(response.coords);

        Geocoder.reverseEncode(latitude, longitude).then(function(address) {
          $scope.order.pickup = address;
          $scope.order.pickupLat = latitude;
          $scope.order.pickupLon = longitude;
          sharedCurrentLocation.setCurrentAddress(address);
        });
      });
    };

    $scope.showLoading = function() {
      $ionicLoading.show({
        template: '<img src="img/loading.gif" height="32" width="32" /><div>Looking for driver</div>',
      })
    };

    $scope.hideLoading = function() {
      $ionicLoading.hide()
    };

    $scope.showAlert = function(message) {
      $ionicPopup.alert({
        title: "Woops something went wrong =(",
        template: message
      });
    };

    $scope.noDriversFound = function() {
      $scope.hideLoading();

      PusherService.subscribe($scope.order.phoneNumber);

      $ionicPopup.show({
        title: 'No drivers found',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
    };

    $scope.submit = function(order) {
      $scope.order = angular.copy(order);

      $scope.showLoading();

      $http.post([API_URL, "orders"].join("/"), {
        order: {
          pickup_address: $scope.order.pickup,
          dropoff_address: $scope.order.dropoff,
          client_name: $scope.order.name,
          phone: $scope.order.phoneNumber,
          pickup_lat: $scope.order.pickupLat,
          pickup_lon: $scope.order.pickupLon,
          dropoff_lat: $scope.order.dropoffLat,
          dropoff_lon: $scope.order.dropoffLon,
          price: $scope.order.price,
          distance: $scope.order.distance
        }
      }).then(function(res) {
        $scope.driverTimeout = setTimeout($scope.noDriversFound, 30000);

        console.log("Order response:", res);
        var channel = PusherService.subscribe($scope.order.phoneNumber);

        //subscribe for order acceptance
        channel.bind('order_accepted', function(orderData) {
          clearTimeout($scope.driverTimeout);

          console.log("push received", orderData);
          $scope.hideLoading();
          sharedOrderResponse.setResponse(orderData);
          $location.path("/info");
          $scope.$apply();
        });

        //subscribe for order finish
        channel.bind('order_completed', function(msg) {
          console.log("completed", msg);
          sharedOrderResponse.setResponse({});
          $location.path("/new");
          $scope.order = {};
          $scope.price_text = 'Price';
          $scope.$apply();
        });
      }, function(error) {
        console.log(error);
        $scope.hideLoading();
        $scope.showAlert(error.statusText === "" ? "Can't send request to server" : error.statusText);
      });
    };


    $scope.get_price = function() {
      var params = 'pickup=' + $scope.order.pickup + '&dropoff=' + $scope.order.dropoff;

      $scope.price_loading = true;

      $http.get([API_URL, "orders", "price"].join("/") + '?' + params)
        .then(function(res) {
          $scope.order.price = res.data.price;
          $scope.order.distance = res.data.distance;
          $scope.price_text = '€ ' + res.data.price + ' (' + res.data.distance / 1000 + ' km)';

          $scope.price_loading = false;
        }).catch(function(error) {
        console.log('Price loading error', error);

        $scope.price_loading = false;
      });
    };

    $scope.geocodePickup = function() {
      if ($scope.order.pickup && $scope.order.pickup.length > 3) {
        if ($scope.pickupTimeout) {
          window.clearTimeout($scope.pickupTimeout);
        }

        $scope.pickupTimeout = setTimeout(function() {
          Geocoder.encode($scope.order.pickup).then(function(geodata) {
            $scope.order.pickup = geodata.formatted_address;
            $scope.order.pickupLat = geodata.geometry.location.lat;
            $scope.order.pickupLon = geodata.geometry.location.lng;
            sharedPickupDropoffLocation.setPickupAdr($scope.order.pickup);
            sharedPickupDropoffLocation.setPickupLon($scope.order.pickupLon);
            sharedPickupDropoffLocation.setPickupLat($scope.order.pickupLat);
          });
        }, 2500);
      }
    };


    $scope.geocodeDropoff = function() {
      if ($scope.order.dropoff && $scope.order.dropoff.length > 3) {
        if ($scope.dropoffTimeout) {
          window.clearTimeout($scope.dropoffTimeout);
        }

        $scope.dropoffTimeout = setTimeout(function() {
          Geocoder.encode($scope.order.dropoff).then(function(geodata) {
            $scope.order.dropoff = geodata.formatted_address;
            $scope.order.dropoffLat = geodata.geometry.location.lat;
            $scope.order.dropoffLon = geodata.geometry.location.lng;
            sharedPickupDropoffLocation.setDropOffAdr($scope.order.dropoff);
            sharedPickupDropoffLocation.setDropOffLon($scope.order.dropoffLon);
            sharedPickupDropoffLocation.setDropOffLat($scope.order.dropoffLat);
          });
        }, 2500);
      }
    };

  $rootScope.$on('pickupChanged', function() {
    $scope.order.pickup = sharedPickupDropoffLocation.getPDAddress();
    $scope.order.pickupLat = sharedPickupDropoffLocation.getLat();
    $scope.order.pickupLon = sharedPickupDropoffLocation.getLon();
    sharedPickupDropoffLocation.setPickupAdr($scope.order.pickup);
    sharedPickupDropoffLocation.setPickupLat($scope.order.pickupLat);
    sharedPickupDropoffLocation.setPickupLon($scope.order.pickupLon);
  });

  $rootScope.$on('dropoffChanged', function() {
    $scope.order.dropoff = sharedPickupDropoffLocation.getPDAddress();
    $scope.order.dropoffLat = sharedPickupDropoffLocation.getLat();
    $scope.order.dropoffLon = sharedPickupDropoffLocation.getLon();
    sharedPickupDropoffLocation.setDropOffAdr($scope.order.dropoff);
    sharedPickupDropoffLocation.setDropOffLon($scope.order.dropoffLon);
    sharedPickupDropoffLocation.setDropOffLat($scope.order.dropoffLat);
  });

  $scope.setNextChangePickup = function() {
    sharedPickupDropoffLocation.setNextChange("pickup");
  };

  $scope.setNextChangeDropoff = function() {
    sharedPickupDropoffLocation.setNextChange("dropoff");
  };

  $scope.price_text = 'Price';
  // fetch user's position, reverse geocode the address and set it as pickup
  $scope.fetchLocation();

    $ionicNavBarDelegate.showBackButton(false);

  });

app.controller('rideInfoCtrl', function($scope, $stateParams, sharedOrderResponse, $ionicNavBarDelegate) {
  var data = sharedOrderResponse.getResponse();
  if (data) {
    $scope.orderInfo = data.order;
    $scope.driverInfo = data.driver;
  }

  $ionicNavBarDelegate.showBackButton(false);
});

app.controller('mapCtrl', function($scope, $state, $location, $compile, $rootScope, Geocoder, sharedCurrentLocation, sharedPickupDropoffLocation, $ionicNavBarDelegate) {

  var lat;
  var lon;
  var latLng;
  var mapOptions;

  $ionicNavBarDelegate.showBackButton(true);

  $scope.fetchLocation = function() {
    navigator.geolocation.getCurrentPosition(function(response) {
      Geocoder.reverseEncode(response.coords.latitude, response.coords.longitude).then(function(address ) {
        $scope.drawMap(response.coords.latitude, response.coords.longitude, address);
      });
    });
  };

  $scope.infoBox = function() {
    google.maps.event.addListenerOnce($scope.map, 'idle', function() {

    google.maps.event.addListener($scope.map, "dragend", function() {
      $scope.mapCtrl.coordinates = $scope.map.getCenter().toUrlValue();
      lat = $scope.mapCtrl.coordinates.split(",")[0];
      lon = $scope.mapCtrl.coordinates.split(",")[1];
      Geocoder.reverseEncode(lat, lon).then(function(address) {
        $scope.mapCtrl.address = address;
        $scope.$evalAsync();
      });
    });

    });
  };

  $scope.mapPicker = function() {
    sharedPickupDropoffLocation.setLat(lat);
    sharedPickupDropoffLocation.setLon(lon);
    sharedPickupDropoffLocation.setPDAddress($scope.mapCtrl.address);
    if ($location.$$absUrl.split("field=")[1] == 'pickup') {
      $rootScope.$broadcast('pickupChanged');
    }
    else {
      $rootScope.$broadcast('dropoffChanged');
    }
    $location.path("/new");
  };

  $scope.drawMap = function(lat, lon, adr) {
    latLng = new google.maps.LatLng(lat, lon);
    mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.mapCtrl = {
      coordinates: lat + "," + lon,
      address: adr
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.infoBox();
  };

  var location = sharedCurrentLocation.getCurrentLocation();
  var locationAdr = sharedCurrentLocation.getCurrentAddress();

  var dropOffAdr = sharedPickupDropoffLocation.getdropOffAdr();
  var dropOffLat = sharedPickupDropoffLocation.getDropOffLat();
  var dropOffLon = sharedPickupDropoffLocation.getDropOffLon();

  var pickupAdr = sharedPickupDropoffLocation.getPickupAdr();
  var pickupLat = sharedPickupDropoffLocation.getPickupLat();
  var pickupLon = sharedPickupDropoffLocation.getPickupLon();

  var nextChange = sharedPickupDropoffLocation.getNextChange();

  if (pickupAdr && pickupLat && pickupLon && nextChange == "pickup") {
    $scope.drawMap(pickupLat, pickupLon, pickupAdr);
  }
  else if (dropOffAdr && dropOffLat && dropOffLon && nextChange == "dropoff") {
    $scope.drawMap(dropOffLat, dropOffLon, dropOffAdr);
  }
  else if (location.latitude && location.longitude) {
    $scope.drawMap(location.latitude, location.longitude, locationAdr);
  }
  else {
    $scope.fetchLocation();
  }

});
