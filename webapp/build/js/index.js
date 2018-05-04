'use strict'; //严格模式下开发
//创建模块 多个模块，隔开
angular.module('app', ['ui.router']);
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



















'use strict';

angular.module('app').controller('companyCtrl', ['$scope', function ($scope) {

}]);
'use strict';

angular.module('app').controller('mainCtrl', ['$http', '$scope', function ($http, $scope) {
     $http.get('/data/positionList.json').then(function (resp) {
         console.log(resp.data);
         $scope.list = resp.data;
     });
}]);
'usr strict';

angular.module('app').controller('positionCtrl', ['$scope', function ($scope) {

}]);
'use strict';

angular.module('app').directive('appCompany',[function () {
    return{
        restrict:'A',
        replace:true,
        templateUrl:'view/template/company.html'
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
        templateUrl: 'view/template/position-class.html'
    }
}]);
'use strict';

angular.module('app').directive('appPositionInfo', [function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/position-info.html',
        scope: {
            isActive: '='
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
