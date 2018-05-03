'use strict';

angular.module('app').controller('mainCtrl', ['$http', '$scope', function ($http, $scope) {
     $http.get('/data/positionList.json').then(function (resp) {
         console.log(111);
         $scope.list = resp.data;
     });
    //$scope用来双向绑定
   /* $scope.list1 = [{
        id: '1',
        name: 'web前端',
        imgSrc: '/image/baidu.png',
        companyName: '百度',
        city: '北京',
        industry: '互联网',
        time: '2018-4-23 9:00'
    }, {
        id: '2',
        name: 'web前端',
        imgSrc: '/image/ali.png',
        companyName: '阿里云',
        city: '杭州',
        industry: '互联网',
        time: '2018-4-20 9:00'
    }];
*/
}]);