angular.module('app.services', [])

  .factory('BlankFactory', [function() {

  }])

  .service('BlankService', [function() {

  }])

  .service('sharedOrderResponse', function() {
    let response = {};

    return {
      getResponse: function() {
        return response
      },
      setResponse: function(res) {
        response = res;
      }
    }
  })

  .service('sharedCurrentLocation', function() {
    let currentLocation = {};
    var address = "";
    return {
      getCurrentLocation: function() {
        return currentLocation;
      },
      setCurrentLocation: function(location) {
        currentLocation = location;
      },
      getCurrentAddress: function() {
        return address;
      },
      setCurrentAddress: function(adr) {
        address = adr;
      }
    }
  })

  .service('sharedPickupDropoffLocation', function() {
    var latitude = 0;
    var longtitude = 0;
    var address = "";
    var droppOffLat =0;
    var dropOffLon = 0;
    var dropOffAdr ="";
    var pickupLat =0;
    var pickupLon =0;
    var pickupAdr ="";
    var nextChange;
    return {
      getLat: function() {
        return latitude
      },
      setLat: function(lat) {
        latitude = lat
      },
      getLon: function() {
        return longtitude
      },
      setLon: function(lon) {
        longtitude = lon
      },
      getPDAddress: function() {
        return address
      },
      setPDAddress: function(adr) {
        address = adr
      },
      getDropOffLat: function() {
        return droppOffLat
      },
      setDropOffLat: function(lat) {
        droppOffLat = lat
      },
      getDropOffLon: function() {
        return dropOffLon
      },
      setDropOffLon: function(lon) {
        dropOffLon = lon
      },
      getdropOffAdr: function() {
        return dropOffAdr
      },
      setDropOffAdr: function(adr) {
        dropOffAdr = adr
      },
      getPickupLat: function() {
        return pickupLat
      },
      setPickupLat: function(lat) {
        pickupLat = lat
      },
      getPickupLon: function() {
        return pickupLon
      },
      setPickupLon: function(lon) {
        pickupLon = lon
      },
      getPickupAdr: function() {
        return pickupAdr
      },
      setPickupAdr: function(adr) {
        pickupAdr = adr
      },
      getNextChange: function() {
        return nextChange
      },
      setNextChange: function(change) {
        nextChange = change
      }
    }
  })

  .service('PusherService', function() {
    var pusher = new Pusher('49d687ce69d0caf32b29', {
      encrypted: true
    });
    return pusher;
  });

