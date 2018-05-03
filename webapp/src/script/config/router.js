'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //声明第一个页面的路由
    $stateProvider.state('main', {
        url: '/main',
        //页面
        templateUrl: 'view/main.html',
        controller: 'mainCtrl'
    }).state('position', {
        //id展示哪个职位的详情页
        url: '/position/:id',
        templateUrl: 'view/position.html',
        controller: 'positionCtrl'
    }).state('company', {
        //id展示那个公司
        url: '/company/:id',
        templateUrl: 'view/company.html',
        controller: 'companyCtrl'
    });
    $urlRouterProvider.otherwise('main');
}]);


















