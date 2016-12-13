'use strict';

var geocodingService = angular.module('geocodingService', [])
  .provider('Geocoder', function() {

    this.$get = function($http) {

      function encode(address) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
          address + '&key=AIzaSyAfld3OudxkQe5f3nKul7gIUxPp4FSbwpE') //todo move to constants and inject trough values
          .then(res => {
            console.log(res.data.results);
            return res.data.results[0];
          })
      }

      function reverseEncode(lat, lng) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          [lat, lng].join(',') + '&key=AIzaSyAfld3OudxkQe5f3nKul7gIUxPp4FSbwpE') //todo move to constants and inject trough values
          .then(res => {
            return res.data.results[0].formatted_address;
          })
      }

      return {
        encode: encode,
        reverseEncode: reverseEncode
      }
    };

    this.$get.$inject = ['$http'];
  });
