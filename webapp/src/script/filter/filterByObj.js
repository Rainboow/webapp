'use strict';
//过滤数组
angular.module('app').filter('filterByObj', [function () {
    //接受的是一个数组和对象
    return function (list, obj) {
        var result = [];
        var isEqual = true; //默认相等
        angular.forEach(list, function (item) {
            //遍历过滤对象
            for (var e in obj) {
                //同样属性值是否相等
                if (item[e] !== obj[e]) {
                    isEqual = false;
                }
            }
            if (isEqual) {
                result.push(item);
            }
        });
        return result;
    };
}]);