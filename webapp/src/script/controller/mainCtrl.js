'use strict';

angular.module('app').controller('mainCtrl', ['$http', '$scope', function ($http, $scope) {
     $http.get('/data/positionList.json').then(function (resp) {
         console.log(resp.data);
         $scope.list = resp.data;
     });
}]);