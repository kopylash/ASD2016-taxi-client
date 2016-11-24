'use strict';

var geocodingService = angular.module('geocodingService', [])
  .provider('Geocoder', function() {

    this.$get = function($http) {

      function reverseEncode(address) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
          address + '&key=AIzaSyAfld3OudxkQe5f3nKul7gIUxPp4FSbwpE') //todo move to constants and inject trough values
          .then(res => {
            return res.data;
          })
      }

      return {
        code: reverseEncode
      }
    };

    this.$get.$inject = ['$http'];
  });
