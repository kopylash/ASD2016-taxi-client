angular.module('app.services', [])

  .factory('BlankFactory', [function () {

  }])

  .service('BlankService', [function () {

  }])

  .service('sharedOrderResponse', function () {
    let response = {};

    return {
      getResponse: function () {
        console.log(response);
        return response
      },
      setResponse: function (res) {
        response = res;
      }
    }
  });
