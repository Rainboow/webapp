'use strict';

angular.module('app').directive('appPositionClass', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            com: '='
        },
        templateUrl: 'view/template/position-class.html',
        link: function ($scope) {
            $scope.showPositionList = function (index) {
                $scope.positionList = $scope.com.positionClass[index].positionList;
                $scope.isActive = index;
            };
            $scope.$watch('com', function (newVal) {
                if (newVal) $scope.showPositionList(0);
            })
        }
    }
}]);