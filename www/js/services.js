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
    return {
      getCurrentLocation: function(){
        return currentLocation;
      },
      setCurrentLocation: function(location){
        currentLocation = location;
      }
    }
  });
