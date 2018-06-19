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
    }).state('search',{
        //搜索页
        url:'/search',
        templateUrl:'view/search.html',
        controller:'searchCtrl'
    }).state('login',{
        //搜索页
        url:'/login',
        templateUrl:'view/login.html',
        controller:'loginCtrl'
    }).state('register',{
        //搜索页
        url:'/register',
        templateUrl:'view/register.html',
        controller:'registerCtrl'
    }).state('me',{
        //搜索页
        url:'/me',
        templateUrl:'view/me.html',
        controller:'meCtrl'
    }).state('favorite',{
        //搜索页
        url:'/favorite',
        templateUrl:'view/favorite.html',
        controller:'favoriteCtrl'
    }).state('post',{
        //搜索页
        url:'/post',
        templateUrl:'view/post.html',
        controller:'postCtrl'
    });
    $urlRouterProvider.otherwise('main');
}]);


















