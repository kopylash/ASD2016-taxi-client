'use strict';

var reverseGeocodingService = angular.module('reverseGeocodingService', [])
  .provider('ReverseGeocoder', function() {

    this.$get = function($http) {

      function reverseEncode(lat, lng) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          [lat, lng].join(',') + '&key=AIzaSyAfld3OudxkQe5f3nKul7gIUxPp4FSbwpE') //todo move to constants and inject trough values
          .then(res => {
            return res.data.results[0].formatted_address;
          })
      }

      return {
        code: reverseEncode
      }
    };

    this.$get.$inject = ['$http'];
  });
