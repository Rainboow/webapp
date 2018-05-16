'use strict';

angular.module('app')
//使用cache服务
/*.service('cache', ['$cookies', function ($cookies) {
this.put = function (key, value) {
    $cookies.put(key, value);
};
this.get = function (key) {
    return $cookies.get(key);
};
this.remove = function (key) {
    $cookies.remove(key);
}
}]);*/

//使用工厂 (可以在内部声明私有属性而使用service就不可以)
.factory('cache', ['$cookies', function ($cookies) {
    return {
        put: function (key, value) {
            $cookies.put(key, value)
        },
        get : function (key) {
            return $cookies.get(key);
        },
        remove : function (key) {
            $cookies.remove(key);
        }
    }
}]);


