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

  .service('sharedCurrentLocation', function(){
    let currentLocation = {};
    var address = "";
    return {
      getCurrentLocation: function(){
        return currentLocation;
      },
      setCurrentLocation: function(location){
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
    return{
      getLat: function() {
        return latitude
      },
      setLat: function(lat){
        latitude = lat
      },
      getLon: function() {
        return longtitude
      },
      setLon: function(lon) {
        longtitude = lon
      },
      getPDAddress: function(){
        return address
      },
      setPDAddress: function(adr) {
        address = adr
      }
    }
  });


