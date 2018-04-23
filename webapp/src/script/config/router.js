'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider ){
    //声明第一个页面的路由
    $stateProvider.state('main',{
        url:'/main',
        //页面
        templateUrl:'view/main.html',
        controller:'mainCtrl'
    });//若多个路由直接链式配置
    //第二个页面的路由
    //若上面路由无效，则转到main下
    $urlRouterProvider.otherwise('main');
}]);

















