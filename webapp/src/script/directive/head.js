'use strict';
//html无法解析- 会被解析成大写
angular.module('app').directive('appHead', [function () {
    return {
        //A代表属性 以属性的方式调用指令
        restrict: "A",
        //把父元素替换掉
        replace: true,
        //模板的位置
        templateUrl: 'view/template/head.html'
    };
}]);