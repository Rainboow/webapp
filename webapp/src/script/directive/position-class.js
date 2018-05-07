'use strict';

angular.module('app').directive('appPositionClass', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope:{
            com:'='
        },
        templateUrl: 'view/template/position-class.html'
    }
}]);