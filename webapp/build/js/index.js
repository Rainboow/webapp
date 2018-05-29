'use strict'; //严格模式下开发
//创建模块 多个模块，隔开
angular.module('app', ['ui.router','ngCookies']);
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

angular.module('app').controller('searchCtrl', ['$scope', '$http', 'dict', function ($scope, $http, dict) {
    $scope.name = '';
    $scope.search = function () {
        $http.get('data/positionList.json?name=' + $scope.name).then(function (resp) {
            $scope.positionList = resp.data;
        });
    };
    $scope.search();
    $scope.sheet = {};
    $scope.tabList = [{
        id: 'city',
        name: '城市'
    }, {
        id: 'salary',
        name: '薪水'
    }, {
        id: 'scale',
        name: '公司规模'
    }];
    $scope.filterObj = {};
    var tabId = ''; //tab页签的id
    //点击时切换列表
    $scope.tClick = function (id, name) {
        //id进行更新
        tabId = id;
        // console.log(dict);
        $scope.sheet.list = dict[id];
        //列表显示出来
        $scope.sheet.visible = true;
    };
    //点击替换顶菜单
    $scope.sClick = function (id, name) {
        //如果有id，下拉菜单时可选择的
        if (id) {
            angular.forEach($scope.tabList, function (item) {
                if (item.id === tabId) {
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
        } else {
            //不选中的时候删除
            delete $scope.filterObj[tabId + 'Id'];
            //遍历
            angular.forEach($scope.tabList, function (item) {
                if (item.id === tabId) {
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪水';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                        default:
                    }
                }
            });
        }
    }

}]);
'use strict';
//value定义一个全局变量
//传入顺序需要保持一致
angular.module('app').value('dict', {}).run(['dict', '$http', function (dict, $http) {
    $http.get('data/city.json').then(function (resp) {
        dict.city = resp.data;
    });
    $http.get('data/salary.json').then(function (resp) {
        dict.salary = resp.data;
    });
    $http.get('data/scale.json').then(function (resp) {
        dict.scale = resp.data;
    });

}]);

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
        scope: {
            //data的scope共享
            data: '=',
            filterObj: '='
        }
    };
}]);

'use strict';

angular.module('app').directive('appSheet', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope:{
            list:'=',
            visible:'=',
            //select作为回调函数
            select:'&'
        },
        templateUrl: 'view/template/sheet.html'
    }
}]);
'use strict';
angular.module('app').directive('appTab', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            list: '=',
            tabClick: '&'
        },
        templateUrl: 'view/template/tab.html',
        link: function ($scope) {
            $scope.click = function (tab) {
                $scope.selectId = tab.id;
                //传给父级
                $scope.tabClick(tab);
            }
        }
    }
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