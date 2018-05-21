'use strict'; //严格模式下开发
//创建模块 多个模块，隔开
angular.module('app', ['ui.router','ngCookies']);
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
    });
    $urlRouterProvider.otherwise('main');
}]);



















'use strict';

angular.module('app').controller('companyCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $http.get('/data/company.json?id=' + $state.params.id).then(function (resp) {
        $scope.company = resp.data;
    })
}]);
'use strict';

angular.module('app').controller('mainCtrl', ['$http', '$scope', function ($http, $scope) {
     $http.get('/data/positionList.json').then(function (resp) {
         $scope.list = resp.data;
     });
}]);
'usr strict';

angular.module('app').controller('positionCtrl', ['$q', '$scope', '$http', '$state', 'cache', function ($q, $scope, $http, $state, cache) {
    //cache.put('to','want');
    //cache.remove('to');
    $scope.isLogin = false;

    function getPosition() {
        //声明延迟加载对象
        var def = $q.defer();
        $http.get('/data/position.json?id=' + $state.params.id).then(function (resp) {
            $scope.position = resp.data;
            def.resolve(resp);
        });
        //返回promise属性
        return def.promise;
    }

    function getCompany(id) {
        $http.get('/data/company.json?id=' + id).then(function (resp) {
            $scope.company = resp.data;
        });
    }

    getPosition().then(function (obj) {
        getCompany(obj.companyId);
    });

}]);
'use strict';

angular.module('app').controller('searchCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/positionList.json').then(function (resp) {
        $scope.positionList = resp.data;
    })
}]);
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



'use strict';

angular.module('app').directive('appCompany', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            com: '='
        },
        templateUrl: 'view/template/company.html'
    }
}]);
'use strict';
//解析foot.html
angular.module('app').directive('appFoot', [function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: '/view/template/foot.html'
    }
}]);

'use strict';

angular.module('app').directive('appHeadBar', [function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/head-bar.html',
        scope: {
            text: '@'
        },
        link: function ($scope) {
            $scope.back = function () {
                //返回
                window.history.back();
            }
        }
    };
}]);
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
'use strict';

angular.module('app').directive('appPositionInfo', [function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/position-info.html',
        scope: {
            isActive: '=',
            isLogin:'=',
            pos:'='
        },
        link: function ($scope) {
            $scope.imagePath = $scope.isActive ? 'image/star-active.png' : 'image/star.png'
        }
    }
}]);
'use strict';

angular.module('app').directive('appPositionList', [function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionList.html',
        scope:{
            //data的scope共享
            data:'='
        }
    };
}]);

'use strict';

angular.module('app').directive('appSheet', [function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/sheet.html'
    }
}]);
'use strict';
angular.module('app').directive('appTab',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/tab.html'
    }
}]);