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